import { Card, CardContent, Typography, Box } from "@mui/material";

const HistoricoInfoCard = () => (
  <Box sx={{ maxWidth: 500, height:"100hv", margin: "32px auto" }}>
    <Card elevation={4}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Análisis Histórico
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Analiza el comportamiento histórico de tus variables eléctricas,
          clave para la identificación de tendencias, patrones de consumo 
          y aumenta la trazabilidad de tus operaciones para identificar oportunidades
          de optimización y ahorro.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Funcionalidades clave:
          <ul>
            <li>Análisis gráfico de datos históricos y perfil de demanda, consumo y distorsión armónico</li>
            <li>Filtro de tiempo dinámico para análizar tus datos en el intervalo de tiempo que desees</li>
            <li>Reportaje mensual de los datos por medidor y descarga de datos en 
                formatos compatibles con tu herramientas de hojas de cálculo </li>
          </ul>
        </Typography>
      </CardContent>
    </Card>
  </Box>
);

export default HistoricoInfoCard;
