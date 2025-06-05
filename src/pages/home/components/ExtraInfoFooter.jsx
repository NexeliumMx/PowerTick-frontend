import { Typography, Box, useTheme } from "@mui/material";

function ExtraInfoFooter() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "7.5px 20px",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        mt: 2,
      }}
    >
      <Typography variant="h6">
        Información adicional: PowerTick es compatible con sistemas industriales y comerciales.
      </Typography>

      <Typography variant="h6">
        Soporte: soporte@powertick.com
      </Typography>

      <Typography variant="h6">PowerTick &reg; 2025</Typography>
    </Box>
  );
}

export default ExtraInfoFooter;