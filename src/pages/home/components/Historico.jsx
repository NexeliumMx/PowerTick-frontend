import {Typography, Box } from "@mui/material";

const HistoricoInfoCard = () => (
  <Box sx={{ height: "100%", alignContent: "center", marginRight: 10 }}>
      <Typography
        variant="h3"
        component="div"
        gutterBottom
        sx={{ fontWeight: 'bold', mt: 4, mb: 2, lineHeight: 1.3 }}
      >
        Análisis Histórico
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 2, lineHeight: 1.7, maxWidth: 600 }}
      >
        Analiza el comportamiento histórico de tus variables eléctricas,
        permitiéndote visualizar tendencias y patrones de consumo para optimizar y ahorrar en tus operaciones.
        Con esta plataforma, identifica oportunidades de mejora y asegura la trazabilidad de tus datos eléctricos.
      </Typography>
      <Typography
        component="div"
        variant="body1"
        color="text.secondary"
        sx={{ mt: 2, lineHeight: 1.7 }}
      >
        Funcionalidades clave:
        <ul style={{ marginTop: 8, marginBottom: 0, lineHeight: 2 }}>
          <li>Análisis gráfico de datos históricos y perfil de demanda, consumo y distorsión armónica</li>
          <li>Filtro de tiempo dinámico para analizar tus datos en el intervalo de tiempo que desees</li>
          <li>Reportes mensuales por medidor y descarga de datos en formatos compatibles con hojas de cálculo</li>
        </ul>
      </Typography>
  </Box>
);

export default HistoricoInfoCard;
