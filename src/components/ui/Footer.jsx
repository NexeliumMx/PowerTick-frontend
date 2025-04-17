import { Typography, Box, Button, useTheme } from "@mui/material";
import { Download } from "@mui/icons-material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme"; // Importa el contexto y los tokens

export function handleManual() {
  // abrir link de manual de usuario
}

export function handleDescarga() {
  // descargar el archivo de manual de usuario
}

function Footer() {
  const theme = useTheme(); // Usar el tema de MUI
  const colors = tokens(theme.palette.mode); // Obtener tokens basados en el modo de la paleta (oscuro o claro)
  const colorMode = useContext(ColorModeContext); // Para cambiar entre modos si es necesario

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between", // Space out elements horizontally
        alignItems: "center", // Align vertically in the center
        padding: "7.5px 20px",
        backgroundColor: theme.palette.background.paper, // Usar color de fondo del tema
        color: theme.palette.text.primary, // Usar color de texto del tema para mejor contraste
      }}
    >
      <Typography variant="h6">Desarrollado por: Nexelium Technological Solutions S.A. de C.V</Typography>

      <Typography variant="h6">contacto@nexelium.com</Typography>

      <Box>
        <Button
          variant="contained"
          onClick={handleManual}
          sx={{ marginRight: "10px", backgroundColor: theme.palette.background.default, color:theme.palette.text.secondary }} // Usar el color primario del token
        >
          Manual de Usuario
        </Button>

        <Button
          variant="contained"
          startIcon={<Download />}
          onClick={handleDescarga}
          sx={{ backgroundColor: theme.palette.background.default, color:theme.palette.text.secondary }} // Usar el color primario del token
        >
          Descargar Manual
        </Button>
      </Box>

      <Typography variant="h6">PowerTick ©</Typography>
    </Box>
  );
}

export default Footer;
