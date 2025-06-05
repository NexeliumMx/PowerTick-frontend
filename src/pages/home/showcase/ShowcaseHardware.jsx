import { motion } from "framer-motion";
import { Box } from "@mui/material";
import HardwareInfoCard from "../components/Hardware";
import logo4 from "../showcaseMedia/logo_powertick-04.svg";

export default function ShowcaseHardware() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -80 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 80 }}
      transition={{ duration: 0.5 }}
      style={{ width: "100%", position: "absolute", display: "flex", flexDirection: "column-reverse", height: "100%" }}
    >
      {/* Example: image on bottom */}
      <Box sx={{ width: "100%", height: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f5" }}>
        <img src={logo4} alt="hardware" style={{ maxWidth: "60%", maxHeight: "90%", objectFit: "contain" }} />
      </Box>
      <Box sx={{ width: "100%", height: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <HardwareInfoCard />
      </Box>
    </motion.div>
  );
}
