import { Box, Typography } from "@mui/material";

const HeroSection = () => (
  <Box
    sx={{
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      alignItems: "center",
      justifyContent: "space-between",
      background: (theme) =>
        theme.palette.mode === "dark"
          ? "linear-gradient(90deg, #232526 0%, #414345 100%)"
          : "linear-gradient(90deg, #f8fafc 0%, #e0e7ef 100%)",
      borderRadius: 3,
      boxShadow: 3,
      px: { xs: 2, md: 8 },
      mb: 4,
    }}
  >
    <Box sx={{ flex: 1 }}>
      <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>
        PowerTick: Control total de tu energía
      </Typography>
      <Typography variant="h5" sx={{ color: "text.secondary", mb: 4 }}>
        Monitorea, analiza y optimiza tu consumo eléctrico en tiempo real y desde cualquier lugar.
      </Typography>
    </Box>
    <Box
      sx={{
        flex: 1,
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        justifyContent: "center",
      }}
    >
    </Box>
  </Box>
);

export default HeroSection;