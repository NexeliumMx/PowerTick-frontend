import { Box, Typography, Divider, Card, CardContent, List, ListItem, ListItemText } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SignBar from "../components/SignBar";
import ExtraInfoFooter from "../components/ExtraInfoFooter";

// Utilidad para estructurar la información de una actualización
function createUpdateLogEntry(title, version, description, features) {
  return {
    title,
    version,
    description,
    features,
    date: new Date().toISOString(),
  };
}

// Ejemplo de actualizaciones
const updates = [
  createUpdateLogEntry(
    "Mejoras de rendimiento",
    "v2.1.0",
    "Esta versión incluye mejoras de rendimiento y nuevas funcionalidades.",
    [
      "Optimización de consultas",
      "Nuevo panel de usuario",
      "Corrección de errores menores",
    ]
  ),
  createUpdateLogEntry(
    "Actualización de seguridad",
    "v2.0.5",
    "Se han aplicado parches de seguridad críticos.",
    [
      "Actualización de dependencias",
      "Mejoras en autenticación",
    ]
  ),
];

export default function UpdateLog() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "neutral.dark",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SignBar />

      <Typography
        variant="h2"
        sx={{
          textAlign: "flex-start",
          marginTop: 4,
          marginLeft: 8,
          color: "primary.main",
          fontWeight: 700,
        }}
      >
        Registro de Actualizaciones
      </Typography>

      <Typography
        variant="h5"
        sx={{
          textAlign: "justify",
          marginTop: 2,
          marginLeft: 8,
          marginRight: 8,
          marginBottom:2,
          color: "primary.main",
          fontWeight: 500,
        }}
      >
        Nuestro compromiso es ofrecerte una experiencia cada vez más robusta,
        eficiente y alineada con tus necesidades. Revisamos y evolucionamos
        constantemente nuestras herramientas para asegurar un desempeño
        confiable, mayor facilidad de uso y mejores resultados en la gestión
        energética. Consulta aquí los cambios más recientes, accede a
        detalles técnicos y descubre cómo aprovechar al máximo las nuevas
        funcionalidades. Porque cada actualización es un paso hacia una
        operación más inteligente, segura y conectada.
      </Typography>

      {/* Cards de actualizaciones */}
      <Box sx={{ mx: 8, mt:2, display: "flex", flexDirection: "column", gap: 3 }}>
        {updates.map((update, idx) => (
          <Card key={idx} sx={{ backgroundColor: "white", boxShadow: 1 }}>
            <CardContent>
              <Typography variant="h3" sx={{ color: "primary.main", fontWeight: 700 }}>
                {update.title}{" "}
                <span style={{ fontWeight: 400, color: theme.palette.secondary.main3 }}>
                  ({update.version})
                </span>
              </Typography>
              <Divider sx={{ my: 1, borderColor: "primary.main", opacity: 0.3 }} />

              <Typography variant="body1" sx={{ mt: 1, mb: 1, color: "primary.main" }}>
                {update.description}
              </Typography>
              <List dense>
                {update.features.map((feature, i) => (
                  <ListItem key={i} sx={{ pl: 0 }}>
                    <ListItemText primary={`• ${feature}`} primaryTypographyProps={{ color: "primary.main" }} />
                  </ListItem>
                ))}
              </List>
              <Typography variant="caption" sx={{ mt: 1, display: "block", color: "primary.main" }}>
                {new Date(update.date).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box sx={{ mt: "auto" }}>
        <ExtraInfoFooter />
      </Box>
    </Box>
  );
}