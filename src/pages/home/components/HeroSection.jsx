import { Box, Typography, Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import heroVideo from "../showcaseMedia/heroVideo.mp4";

const HeroSection = () => (
  <Box
    sx={{
      width: "100%",
      height: "90vh", // Changed from minHeight to height
      position: "relative",
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      alignItems: "center",
      justifyContent: "space-between",
      overflow: "hidden",
      boxShadow: 3,
      px: { xs: 2, md: 8 },
      // mb: 4, // Remove margin-bottom to avoid extra space
    }}
    id="hero-section"
  >
    {/* Video background */}
    <Box
      component="video"
      src={heroVideo}
      autoPlay
      loop
      muted
      playsInline
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: 0,
        opacity: 0.45,
        pointerEvents: "none",
      }}
    />
    {/* Content */}
    <Box sx={{ flex: 1, zIndex: 1 }}>
      <Typography variant="h2" sx={{ fontWeight: 800, mb: 2, color: "primary.main" }}>
        PowerTick: Control total de tu energía
      </Typography>
      <Typography variant="h5" sx={{ color: "primary.main", mb: 4 }}>
        Monitorea, analiza y optimiza tu consumo eléctrico en tiempo real y desde cualquier lugar.
      </Typography>
    </Box>
    <Box
      sx={{
        flex: 1,
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
      }}
    >
      {/* Puedes agregar aquí contenido visual adicional si lo deseas */}
    </Box>
    {/* Arrow button */}
    <Box
      sx={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 32,
        display: "flex",
        justifyContent: "center",
        zIndex: 2,
      }}
    >
      <Button
        variant="contained"
        color="primary"
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          borderRadius: 99,
          px: 3,
          py: 1.5,
          fontWeight: "bold",
          fontSize: 18,
          boxShadow: 3,
        }}
        href="#showcase-section"
      >
        Conoce más
      </Button>
    </Box>
  </Box>
);

export default HeroSection;