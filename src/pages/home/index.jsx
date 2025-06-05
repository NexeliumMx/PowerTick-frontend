import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useMsal } from "@azure/msal-react";
import { useEffect, useRef, useState } from "react";
import SignBar from "./components/SignBar";
import HeroSection from "./components/HeroSection";
import { AnimatePresence } from "framer-motion";
import ExtraInfoFooter from "./components/ExtraInfoFooter";
import ContactSection from "./components/ContactSection";
// Import each showcase card component
import ShowcaseTiempoReal from "./showcase/ShowcaseTiempoReal";
import ShowcaseHistorico from "./showcase/ShowcaseHistorico";
import ShowcaseMedidor from "./showcase/ShowcaseMedidor";
import ShowcaseHardware from "./showcase/ShowcaseHardware";
import ShowcaseMonitoreo from "./showcase/ShowcaseMonitoreo";

// Array of showcase card components (order matters)
const showcaseCards = [
  { key: "tiempo", component: <ShowcaseTiempoReal /> },
  { key: "historico", component: <ShowcaseHistorico /> },
  { key: "medidor", component: <ShowcaseMedidor /> },
  { key: "hardware", component: <ShowcaseHardware /> },
  { key: "monitoreo", component: <ShowcaseMonitoreo /> },
];

export default function Home() {
  const navigate = useNavigate();
  const { accounts } = useMsal();
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const scrollTimeout = useRef(null);
  const [showcaseActive, setShowcaseActive] = useState(false);
  const showcaseLockedRef = useRef(false);

  useEffect(() => {
    if (accounts.length > 0) {
      navigate("/load-center");
    }
  }, [accounts, navigate]);

  // Scroll lock logic
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Only lock when the top is very close to the top of the viewport
      if (rect.top >= -50 && rect.top <= 2 && rect.bottom > window.innerHeight / 2) {
        setShowcaseActive(true);
        document.body.style.overflow = "hidden";
        if (!showcaseLockedRef.current) {
          window.scrollTo({ top: window.scrollY + rect.top, behavior: "auto" });
          showcaseLockedRef.current = true;
        }
      } else {
        setShowcaseActive(false);
        document.body.style.overflow = "";
        showcaseLockedRef.current = false;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: false });
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "";
      showcaseLockedRef.current = false;
    };
  }, []);

  // Handle wheel for card transitions only when showcase is active
  useEffect(() => {
    if (!showcaseActive) return;

    const handleWheel = (e) => {
      console.log("Scroll Event Triggered");
      console.log("Delta:", e.deltaY, "Active Index:", activeIndex);



      const delta = e.deltaY;
      const isScrollingDown = delta > 0;
      const isScrollingUp = delta < 0;

      const allowScrollUpToExit = isScrollingUp && activeIndex === 0;
      const allowScrollDownToExit = isScrollingDown && activeIndex === showcaseCards.length - 1;

      if (!allowScrollUpToExit && !allowScrollDownToExit) {
        e.preventDefault();
        e.stopPropagation();
      }

      if (scrollTimeout.current) return;

      if (isScrollingDown && activeIndex < showcaseCards.length - 1) {
        setActiveIndex((prev) => Math.min(prev + 1, showcaseCards.length - 1));
      } else if (isScrollingUp && activeIndex > 0) {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      } else if (allowScrollUpToExit || allowScrollDownToExit) {
        document.body.style.overflow = "";
        setShowcaseActive(false);
        showcaseLockedRef.current = false;
      }

      scrollTimeout.current = setTimeout(() => {
        scrollTimeout.current = null;
      }, 500);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [activeIndex, showcaseActive]);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      <SignBar />
      {/* Hero section takes the whole screen */}
      <Box sx={{ width: "100%", height: "100vh" }}>
        <HeroSection />
      </Box>
      {/* Showcase section with animated, customizable cards */}
      <Box
        ref={containerRef}
        sx={{
          width: "100%",
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
          {showcaseCards.map((c, idx) =>
            idx === activeIndex ? (
              <c.component.type key={c.key} />
            ) : null
          )}
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
        {showcaseCards.map((c) => (
          <Box key={c.key} sx={{ width: "100%", mb: 2 }}>
            <c.component.type />
          </Box>
        ))}
      </Box>
      {/* Contact section after the showcase */}
      <ContactSection />
      <ExtraInfoFooter />
    </Box>
  );
}