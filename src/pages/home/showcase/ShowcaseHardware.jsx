import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";
import HardwareInfoCard from "../components/Hardware";
import Casing from "../showcaseMedia/Casing.png";
import { useTheme } from "@mui/material/styles";
export default function ShowcaseHardware() {
    const theme = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: -80 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 80 }}
      transition={{ duration: 0.5 }}
      style={{ width: "100%", position: "absolute", display: "flex", flexDirection: "column", height: "100%" }}
    >
      {/* Info card on top */}
      <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", mt: 10 }}>
        <HardwareInfoCard />
      </Box>
      {/* Image and info below */}
      <Box
        sx={{
          width: "100%",
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: 1200,
            minHeight: 400,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={Casing}
            alt="Hardware Casing"
            style={{
              width: 250,
              height: "auto",
              borderRadius: "8px",
              display: "block",
            }}
            id="hardware-image"
          />
          {/* SVG lines */}
          <svg
            width="100%"
            height="100%"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            {/* Top Left Line: from bottom center of top-left box to image */}
            <line
              x1={297.5} y1={119.5} // left + half width, top + box height (approx)
              x2={475} y2={150}
              stroke={theme.palette.text.secondary}
              strokeWidth="2"
                strokeLinecap="round"
            />
            {/* Top Right Line: from bottom center of top-right box to image */}
            <line
              x1={882} y1={136} // right + half width (from right), top + box height
              x2={600 + 125} y2={200}
              stroke={theme.palette.text.secondary}
              strokeWidth="2"
                              strokeLinecap="round"

            />
            {/* Bottom Left Line: from top center of bottom-left box to image */}
            <line
              x1={315.5} y1={316} // left + half width, bottom (y)
              x2={475} y2={280}
              stroke={theme.palette.text.secondary}
              strokeWidth="2"
                              strokeLinecap="round"

            />
            {/* Bottom Right Line: from top center of bottom-right box to image */}
            <line
              x1={885} y1={316} // right + half width (from right), bottom (y)
              x2={600 + 125} y2={285}
              stroke={theme.palette.text.secondary}
              strokeWidth="2"
                              strokeLinecap="round"

            />
          </svg>
          {/* Top Left */}
          <Box
            sx={{
              position: "absolute",
              top: 50,
              left: 120,
              width: 220,
              borderRadius: 2,
              p: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "2px solid",
              borderColor: "text.secondary",
              clipPath: "polygon(0% 0%, 100% 0%, 100% 60%, 80% 100%, 0% 100%)",
              zIndex: 2,
            }}
          >
            <Typography component="div" variant="body2" color="text.secondary">
              Instalación rápida y sencilla en tableros eléctricos existentes
            </Typography>
          </Box>
          {/* Top Right */}
          <Box
            sx={{
              position: "absolute",
              top: 50,
              right: 120,
              width: 260,
              borderRadius: 2,
              p: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "2px solid",
              borderColor: "text.secondary",
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 70%)",
              zIndex: 2,
            }}
          >
            <Typography component="div" variant="body2" color="text.secondary">
              Módulo de alimentación autónomo; no necesita de enchufes externos ni genera cables innecesarios
            </Typography>
          </Box>
          {/* Bottom Left */}
          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              left: 120,
              width: 240,
              borderRadius: 2,
              p: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "2px solid",
              borderColor: "text.secondary",
              clipPath: "polygon(0% 0%, 80% 0%, 100% 20%, 100% 100%, 0% 100%)",
              zIndex: 2,
            }}
          >
            <Typography component="div" variant="body2" color="text.secondary">
              Soporte para actualizaciones y reparaciones remotas de firmware
            </Typography>
          </Box>
          {/* Bottom Right */}
          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              right: 120,
              width: 240,
              borderRadius: 2,
              p: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "2px solid",
              borderColor: "text.secondary",
              clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 20%)",
              zIndex: 2,
            }}
          >
            <Typography component="div" variant="body2" color="text.secondary">
              Acatando estándares internacionales de seguridad de hardware
            </Typography>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}
