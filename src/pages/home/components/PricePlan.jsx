import { Box, Typography, Card, CardContent, Grid, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function PricePlanSection() {
  const theme = useTheme();

  return (
    <Box sx={{ width: "100%", py: 8, backgroundColor: theme.palette.neutral.main, px: 5 }}>
      <Typography variant="h3" align="center" fontWeight="bold" mb={4} color="primary">
        Planes y Precios
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Card
            variant="outlined"
            sx={{
              minHeight: 400,
              backgroundColor: theme.palette.neutral.light,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
                Básico
              </Typography>
              <Typography color="primary" mb={2}>
                Monitoreo esencial y reportes básicos.
              </Typography>
              <Typography variant="h4" color="primary" mb={2}>
                $499<span style={{ fontSize: 18 }}> /mes</span>
              </Typography>
              <ul
                style={{
                  color: theme.palette.primary.main,
                  borderRadius: 8,
                  padding: "12px 16px",
                  margin: 0,
                  marginBottom: 0,
                  listStyle: "disc inside",
                }}
              >
                <li>Monitoreo en tiempo real</li>
                <li>Histórico de datos 1 mes</li>
                <li>Alertas básicas</li>
              </ul>
            </CardContent>
            <Box sx={{ p: 2, pt: 0 }}>
              <Button variant="contained" color="primary" fullWidth>
                Seleccionar
              </Button>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            variant="outlined"
            sx={{
              minHeight: 400,
              backgroundColor: theme.palette.neutral.light,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
                Profesional
              </Typography>
              <Typography color="primary" mb={2}>
                Funcionalidad avanzada y soporte prioritario.
              </Typography>
              <Typography variant="h4" color="primary" mb={2}>
                $999<span style={{ fontSize: 18 }}> /mes</span>
              </Typography>
              <ul
                style={{
                  color: theme.palette.primary.main,
                  borderRadius: 8,
                  padding: "12px 16px",
                  margin: 0,
                  marginBottom: 0,
                  listStyle: "disc inside",
                }}
              >
                <li>Todo lo del plan Básico</li>
                <li>Histórico de datos 12 meses</li>
                <li>Reportes automáticos</li>
                <li>Soporte prioritario</li>
              </ul>
            </CardContent>
            <Box sx={{ p: 2, pt: 0 }}>
              <Button variant="contained" color="primary" fullWidth>
                Seleccionar
              </Button>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            variant="outlined"
            sx={{
              minHeight: 400,
              backgroundColor: theme.palette.neutral.light,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
                Empresarial
              </Typography>
              <Typography color="primary" mb={2}>
                Soluciones personalizadas y soporte dedicado.
              </Typography>
              <Typography variant="h4" color="primary" mb={2}>
                A consultar
              </Typography>
              <ul
                style={{
                  color: theme.palette.primary.main,
                  borderRadius: 8,
                  padding: "12px 16px",
                  margin: 0,
                  marginBottom: 0,
                  listStyle: "disc inside",
                }}
              >
                <li>Todo lo del plan Profesional</li>
                <li>Integraciones personalizadas</li>
                <li>Soporte dedicado</li>
                <li>Consultoría especializada</li>
              </ul>
            </CardContent>
            <Box sx={{ p: 2, pt: 0 }}>
              <Button variant="contained" color="primary" fullWidth>
                Seleccionar
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}