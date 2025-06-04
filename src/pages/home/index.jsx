import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useMsal } from "@azure/msal-react";
import { useEffect, useRef, useState } from "react";
import SignBar from "./components/SignBar";
import HeroSection from "./components/HeroSection";
import TiempoRealInfoCard from "./components/TiempoReal";
import HistoricoInfoCard from "./components/Historico";
import MedidorInfoCard from "./components/Medidor";
import HardwareInfoCard from "./components/Hardware";
import MonitoreoDistanciaInfoCard from "./components/MonitoreoDistancia";
import { motion, AnimatePresence } from "framer-motion";

const cards = [
  { component: <TiempoRealInfoCard />, key: "tiempo" },
  { component: <HistoricoInfoCard />, key: "historico" },
  { component: <MedidorInfoCard />, key: "medidor" },
  { component: <HardwareInfoCard />, key: "hardware" },
  { component: <MonitoreoDistanciaInfoCard />, key: "monitoreo" },
];

export default function Home() {
  const navigate = useNavigate();
  const { accounts } = useMsal();
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const scrollTimeout = useRef(null);


  useEffect(() => {
    if (accounts.length > 0) {
      navigate("/load-center");
    }
  }, [accounts, navigate]);

 useEffect(() => {
  const handleWheel = (e) => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Only act if hovering the container
    if (!container.matches(':hover')) return;

    const delta = e.deltaY;
    const isScrollingDown = delta > 0;
    const isScrollingUp = delta < 0;

    // Check if container is fully at the top of the viewport
    const rect = container.getBoundingClientRect();
    const fullyVisible = Math.abs(rect.top) < 2; // allow a small threshold

    // Only allow scroll down to next card if cards are fully visible (at top)
    if (isScrollingDown && !fullyVisible) {
      // Let the page scroll until cards are at the top
      return;
    }

    // Prevent scroll for all other conditions except scrolling up on first card
    const allowScrollUpToExit = isScrollingUp && activeIndex === 0;
    if (!allowScrollUpToExit) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Don't scroll if throttled
    if (scrollTimeout.current) return;

    // Scroll logic
    if (isScrollingDown && activeIndex < cards.length - 1) {
      setActiveIndex((prev) => Math.min(prev + 1, cards.length - 1));
    } else if (isScrollingUp && activeIndex > 0) {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }

    // Throttle next scroll
    scrollTimeout.current = setTimeout(() => {
      scrollTimeout.current = null;
    }, 500);
  };

  window.addEventListener('wheel', handleWheel, { passive: false, capture: true });

  return () => {
    window.removeEventListener('wheel', handleWheel, { capture: true });
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = null;
  };
}, [activeIndex, cards.length]);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      <SignBar />
      {/* Hero section takes the whole screen */}
      <Box sx={{ width: "100vw", height: "100vh" }}>
        <HeroSection />
      </Box>
      {/* Cards take the whole screen, one at a time, after hero */}
      <Box
        ref={containerRef}
        sx={{
          width: "100vw",
          height: "100vh",
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "background.paper",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={cards[activeIndex].key}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.5 }}
            style={{ width: "100%", position: "absolute" }}
          >
            {cards[activeIndex].component}
          </motion.div>
        </AnimatePresence>
      </Box>
      {/* Fallback for mobile: show cards stacked below hero */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: 3,
          mt: { xs: 2, md: 4 },
        }}
      >
        {cards.map((c) => (
          <Box key={c.key} sx={{ width: "100%",  mb: 2 }}>
            {c.component}
          </Box>
        ))}
      </Box>
    </Box>
  );
}