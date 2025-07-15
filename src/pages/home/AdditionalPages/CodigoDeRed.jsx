import { Box, Typography } from "@mui/material";
import SignBar from "../components/Topbar";
import ExtraInfoFooter from "../components/ExtraInfoFooter";

export default function CodigoDeRed() {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "white", display: "flex", flexDirection: "column" }}>
      <SignBar />
      <Box sx={{ flex: 1, px: { xs: 2, md: 6 }, py: 4, maxWidth: 900, mx: "auto"  }}>
        <Typography variant="h2" color="primary.main" fontWeight={700} gutterBottom>
          Código de Red
        </Typography>
      </Box>
      <Box sx={{ mt: "auto" }}>
        <ExtraInfoFooter />
      </Box>
    </Box>
  );
}