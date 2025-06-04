import { Card, CardContent, Typography, Box } from "@mui/material";

const TiempoRealInfoCard = () => (
  <Box sx={{ maxWidth: 500, height:"100hv", margin: "32px auto" }}>
    <Card elevation={4}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Monitoreo en Tiempo Real
        </Typography>
        <Typography variant="body1" color="text.secondary">
           Powertick te ofrece una solución de monitoreo en 
           tiempo real de tus variables eléctricas, permitiéndote 
           visualizar el consumo energético e identificar tus áreas
           de oportunidad al instante.
            Con esta plataforma, asegurate de que 
            tu sistema esté siempre funcionando de manera óptima todo
            el tiempo e identifica y corrige anomalías al instante.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Monitoreo gráfico en vivo de:
          <ul>
            <li>Demanda de potencias efectivas y reactivas</li>
            <li>Voltajes línea-línea y línea-neutro</li>
            <li>Corrientes de fase</li>
            <li>Factor de potencia</li>
            <li>Distorsión armónica</li>
          </ul>
        </Typography>
      </CardContent>
    </Card>
  </Box>
);

export default TiempoRealInfoCard;
