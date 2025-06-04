import { Card, CardContent, Typography, Box } from "@mui/material";

const MonitoreoDistanciaInfoCard = () => (
  <Box sx={{ maxWidth: 500, height:"100hv", margin: "32px auto" }}>
    <Card elevation={4}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Acceso remoto y seguro
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Supervisa el estado de tu sistema eléctrico desde 
          cualquier lugar y en cualquier momento. 
          PowerTick te permite acceder a tus datos en 
          tiempo real y recibir notificaciones sin 
          importar dónde te encuentres. Con protección de datos
          avanzada con cumplimiento con estándares como GDPR, ISO 27001 y SOC 2,
          así como manejo de usuarios y roles, solamente tú puedes decidir
          quienes pueden acceder a tu información.

        </Typography>
      </CardContent>
    </Card>
  </Box>
);

export default MonitoreoDistanciaInfoCard;
