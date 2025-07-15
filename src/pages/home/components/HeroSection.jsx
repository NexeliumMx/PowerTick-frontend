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
      alignItems: "flex",
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
        opacity: 1,
        pointerEvents: "none",
      }}
    />
    {/* Content */}
    <Box sx={{ 
      flex: 1,
      zIndex: 1, 
      minWidth: { xs: "100%", md: "80%" },
      mt: { xs: 4, md: 5 },
      }}>
      <Typography variant="h1" sx={{ fontWeight: 800, mb: 2, color: "primary.main" }}>
        La salud de tus procesos empieza con buena calidad energética; un sistema bien alimentado vive más, mejor y con menos
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 600, color: "primary.main", mb: 4 }}>
        Gestiona tu calidad energética y optimiza tu consumo eléctrico a través de monitoreo en tiempo real y herramientas de análisis histórico desde cualquier lugar en todo momento.
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