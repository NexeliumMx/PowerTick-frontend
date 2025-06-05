import { Card, CardContent, Typography, Box } from "@mui/material";

const HardwareInfoCard = () => (
  <Box sx={{ maxWidth: 500, height:"100hv", margin: "32px auto" }}>
    <Card elevation={4}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Hardware e instalación segura
        </Typography>
        <Typography variant="body1" color="text.secondary">
          El hardware de PowerTick está diseñado para ofrecer robustez, confiabilidad y facilidad de integración en cualquier entorno industrial o comercial. 
          Sus componentes cumplen con los más altos estándares de calidad y seguridad eléctrica para garantizar el funcionamiento del sistema y
          la seguridad de tu instalación eléctrica.
        </Typography>
        <Typography component="div" variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Tecnología avanzada para tu instalación:
 
          <ul>
            <li>Instalación rápida y sencilla en tableros eléctricos existentes</li>
            <li>Módulo de alimentación autónomo; no necesita de enchufes externos ni genera cables innecesarios.</li>
            <li>Soporte para actualizaciones y reparaciones remotas de firmware</li>
            <li>Acatando estándares internacionales de seguridad de hardware</li>
          </ul>
               </Typography>
      </CardContent>
    </Card>
  </Box>
);

export default HardwareInfoCard;
