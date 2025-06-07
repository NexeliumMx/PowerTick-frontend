import { CardContent, Typography, Box } from "@mui/material";

const TiempoRealInfoCard = () => (
  <Box sx={{ height: "100%", alignContent: "center", marginRight: 10 }}>
    <CardContent>
      <Typography
        variant="h3"
        component="div"
        gutterBottom
        sx={{ fontWeight: 'bold', mt: 4, mb: 2, lineHeight: 1.3 }}
      >
        Monitoreo en Tiempo Real
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 2, lineHeight: 1.7, maxWidth: 600 }}
      >
        Powertick te ofrece una solución de monitoreo en
        tiempo real de tus variables eléctricas, permitiéndote
        visualizar el consumo energético e identificar tus áreas
        de oportunidad al instante.
        Con esta plataforma, asegurate de que
        tu sistema esté siempre funcionando de manera óptima todo
        el tiempo e identifica y corrige anomalías al instante.
      </Typography>
      <Typography
        component="div"
        variant="body1"
        color="text.secondary"
        sx={{ mt: 2, lineHeight: 1.7 }}
      >
        Monitoreo gráfico en vivo de:
        <ul style={{ marginTop: 8, marginBottom: 0, lineHeight: 2 }}>
          <li>Demanda de potencias efectivas y reactivas</li>
          <li>Voltajes línea-línea y línea-neutro</li>
          <li>Corrientes de fase</li>
          <li>Factor de potencia</li>
          <li>Distorsión armónica</li>
        </ul>
      </Typography>
    </CardContent>
  </Box>
);

export default TiempoRealInfoCard;
