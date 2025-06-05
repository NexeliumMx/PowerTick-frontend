import { Card, CardContent, Typography, Box } from "@mui/material";

const MedidorInfoCard = () => (
  <Box sx={{ maxWidth: 500, height:"100hv", margin: "32px auto" }}>
    <Card elevation={4}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Medidor de Energía
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Con el fin de garantizar información confiable, el 
          sistema de powertick integra un medidor de 
          energía de alta precisión, clasificados como 
          clase 1 para energía real y clase 2 para energía reactiva
           según el estándar internacional EN62053-21/23.
            </Typography>
        <Typography component="div" variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          3 decimales de precisión con mediciones de:
         
          <ul>
            <li>±0.5% para voltaje línea-neutro</li>
            <li>±1.0% para voltaje línea-línea</li>
            <li>±0.5% para corrientes de línea</li>
            <li>±1.0% para potencia efectiva</li>
            <li>±2.0% para potencia reactiva</li>
          </ul>
           </Typography>
        
      </CardContent>
    </Card>
  </Box>
);

export default MedidorInfoCard;
