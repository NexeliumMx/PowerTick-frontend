import { Card, Skeleton, Box } from "@mui/material";

const ChartSkeletonCard = () => (
  <Card sx={{ minWidth: 275, padding: 0 }}>
    {/* Simula el título del gráfico 
    <Skeleton animation="wave" variant="text" width="40%" height={30} sx={{ mb: 2 }} />
    <Skeleton animation="wave" variant="rectangular" width={120} height={36} sx={{ mx: "auto", mt: 2 }} />
    {/* Simula el área de la gráfica */}
    <Skeleton animation="pulse" variant="rounded" height={350} />
    
  </Card>
);

export default ChartSkeletonCard;