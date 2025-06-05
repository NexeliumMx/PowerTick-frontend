import { motion } from "framer-motion";
import { Box } from "@mui/material";
import HistoricoInfoCard from "../components/Historico";
import logo2 from "../showcaseMedia/logo_powertick-02.svg";

export default function ShowcaseHistorico() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.5 }}
      style={{ width: "100%", position: "absolute", display: "flex", height: "100%" }}
    >
      {/* Example: image on right */}
      <Box sx={{ width: "50%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <HistoricoInfoCard />
      </Box>
      <Box sx={{ width: "50%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f5" }}>
        <img src={logo2} alt="historico" style={{ maxWidth: "90%", maxHeight: "80%", objectFit: "contain" }} />
      </Box>
    </motion.div>
  );
}
