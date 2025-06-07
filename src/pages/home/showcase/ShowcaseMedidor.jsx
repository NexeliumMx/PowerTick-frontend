import { motion } from "framer-motion";
import { Box } from "@mui/material";
import MedidorInfoCard from "../components/Medidor";

export default function ShowcaseMedidor() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -80 }}
      transition={{ duration: 0.5 }}
      style={{ width: "100%", position: "absolute", display: "flex", flexDirection: "column", height: "100vh" }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MedidorInfoCard />
      </Box>
    </motion.div>
  );
}
