import { motion } from "framer-motion";
import { Box } from "@mui/material";
import MedidorInfoCard from "../components/Medidor";
import logo3 from "../showcaseMedia/logo_powertick-03.svg";

export default function ShowcaseMedidor() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -80 }}
      transition={{ duration: 0.5 }}
      style={{ width: "100%", position: "absolute", display: "flex", flexDirection: "column", height: "100%" }}
    >
      {/* Example: image on top */}
      <Box sx={{ width: "100%", height: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f5" }}>
        <img src={logo3} alt="medidor" style={{ maxWidth: "60%", maxHeight: "90%", objectFit: "contain" }} />
      </Box>
      <Box sx={{ width: "100%", height: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <MedidorInfoCard />
      </Box>
    </motion.div>
  );
}
