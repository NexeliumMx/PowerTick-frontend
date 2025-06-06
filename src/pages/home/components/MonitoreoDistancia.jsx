import {Typography, Box } from "@mui/material";

const MonitoreoDistanciaInfoCard = () => (
  <Box sx={{ height: "100%", alignContent: "center", marginRight: 10 }}>
    <Typography
      variant="h3"
      component="div"
      gutterBottom
      sx={{ fontWeight: 'bold', mt: 4, mb: 2, lineHeight: 1.3 }}
    >
      Acceso remoto y seguro
    </Typography>
    <Typography
      variant="body1"
      color="text.secondary"
      sx={{ mb: 2, lineHeight: 1.7, maxWidth: 600 }}
    >
      Supervisa el estado de tu sistema eléctrico desde 
      cualquier lugar y en cualquier momento. 
      PowerTick te permite acceder a tus datos en 
      tiempo real y recibir notificaciones sin 
      importar dónde te encuentres. Con protección de datos
      avanzada con cumplimiento con estándares como GDPR, ISO 27001 y SOC 2,
      así como manejo de usuarios y roles, solamente tú puedes decidir
      quienes pueden acceder a tu información.
    </Typography>
    <Typography
      component="div"
      variant="body1"
      color="text.secondary"
      sx={{ mt: 2, lineHeight: 1.7 }}
    >
      Funcionalidades clave:
      <ul style={{ marginTop: 8, marginBottom: 0, lineHeight: 2 }}>
        <li>Acceso remoto seguro a tus datos eléctricos</li>
        <li>Notificaciones en tiempo real ante eventos críticos</li>
        <li>Gestión de usuarios y roles para control de acceso</li>
        <li>Cumplimiento con estándares internacionales de seguridad y privacidad</li>
      </ul>
    </Typography>
  </Box>
);

export default MonitoreoDistanciaInfoCard;
