import { Box, Divider, Typography} from "@mui/material";
import SignBar from "../components/SignBar";
import ExtraInfoFooter from "../components/ExtraInfoFooter";

export default function AcercaDe() {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "white", display: "flex", flexDirection: "column" }}>
      <SignBar />
      <Box sx={{ flex: 1, px: { xs: 2, md: 6 }, py: 4, maxWidth: 900, mx: "auto" }}>
        <Typography variant="h2" color="primary.main" fontWeight={700} gutterBottom>
          Acerca de Nosotros
        </Typography>
        <Divider sx={{ mb: 2 }} />
      </Box>
      <Box sx={{ mt: "auto" }}>
        <ExtraInfoFooter />
      </Box>
    </Box>
  );
}