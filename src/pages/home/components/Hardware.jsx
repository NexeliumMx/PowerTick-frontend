import {Typography, Box } from "@mui/material";

const HardwareInfoCard = () => (
  <Box sx={{ maxWidth: 1000, height:"100hv" }}>
        <Typography variant="h3" component="div" gutterBottom marginBottom={2} sx={{ fontWeight: "bold" }}>
          Hardware e instalación segura
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          El hardware de PowerTick está diseñado para ofrecer robustez, confiabilidad y facilidad de integración en cualquier entorno industrial o comercial. 
          Sus componentes cumplen con los más altos estándares de calidad y seguridad eléctrica para garantizar el funcionamiento del sistema y
          la seguridad de tu instalación eléctrica.
        </Typography>
  </Box>
);

export default HardwareInfoCard;
