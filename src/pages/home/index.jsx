import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useMsal } from "@azure/msal-react";
import { useEffect, useRef, useState } from "react";
import SignBar from "./components/SignBar";
import HeroSection from "./components/HeroSection";
import { AnimatePresence } from "framer-motion";
import ExtraInfoFooter from "./components/ExtraInfoFooter";
import ContactSection from "./components/ContactSection";
import PricePlanSection from "./components/PricePlan"; 
import ShowcaseTiempoReal from "./showcase/ShowcaseTiempoReal";
import ShowcaseHistorico from "./showcase/ShowcaseHistorico";
import ShowcaseMedidor from "./showcase/ShowcaseMedidor";
import ShowcaseHardware from "./showcase/ShowcaseHardware";
import ShowcaseMonitoreo from "./showcase/ShowcaseMonitoreo";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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
      console.log("Showcase rect.top:", rect.top, "rect.bottom:", rect.bottom, "windowInner",window.innerHeight); // <-- Logging here

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
    <Box sx={{ minHeight: "100%", backgroundColor: "background.default" }}>
      <SignBar />
      {/* Hero section takes the whole screen */}
      <Box sx={{ width: "100%", height: "100%" }}>
        <HeroSection />
      </Box>
      {/* Showcase section with animated, customizable cards */}
      <Box
        ref={containerRef}
        sx={{
          width: "100%",
          height: { md: "100vh", xs: "auto" },
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "background.paper",
        }}
      >
        {/* Left Arrow */}
        <Box
          sx={{
            position: "absolute",
            left: 24,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            display: activeIndex > 0 ? "flex" : "none",
            bgcolor: "background.paper",
            borderRadius: "50%",
            boxShadow: 2,
            cursor: "pointer",
            p: 1,
            "&:hover": { bgcolor: "grey.100" },
          }}
          onClick={() => setActiveIndex((prev) => Math.max(prev - 1, 0))}
        >
          <ArrowBackIosNewIcon />
        </Box>
        {/* Right Arrow */}
        <Box
          sx={{
            position: "absolute",
            right: 24,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            display: activeIndex < showcaseCards.length - 1 ? "flex" : "none",
            bgcolor: "background.paper",
            borderRadius: "50%",
            boxShadow: 2,
            cursor: "pointer",
            p: 1,
            "&:hover": { bgcolor: "grey.100" },
          }}
          onClick={() => setActiveIndex((prev) => Math.min(prev + 1, showcaseCards.length - 1))}
        >
          <ArrowForwardIosIcon />
        </Box>
        <AnimatePresence mode="wait">
          {showcaseCards.map((c, idx) =>
            idx === activeIndex ? (
              <c.component.type key={c.key} />
            ) : null
          )}
        </AnimatePresence>
        {/* Dots Indicator */}
        <Box
          sx={{
            position: "absolute",
            bottom: 32,
            left: 0,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
            gap: 1.5,
          }}
        >
          {showcaseCards.map((c, idx) => (
            <Box
              key={c.key}
              onClick={() => setActiveIndex(idx)}
              sx={{
                width: 7,
                height: 7, 
                borderRadius: "50%",
                backgroundColor: idx === activeIndex ? "primary.main" : "grey.400",
                border: idx === activeIndex ? "2px solid" : "1px solid",
                borderColor: idx === activeIndex ? "primary.main" : "grey.300",
                mx: 0.5,
                cursor: "pointer",
                transition: "background 0.2s, border 0.2s",
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Price Plan section */}
      <PricePlanSection />

      {/* Contact section after the showcase */}
      <ContactSection />
      <ExtraInfoFooter />
    </Box>
  );
}