import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import GavazziMeter from "../showcaseMedia/GavazziMeter.png";

const MedidorInfoCard = () => (
  <Box sx={{ width: "100%", maxWidth: 1200, margin: "40px auto" }}>
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        flexWrap: { xs: "wrap", md: "nowrap" },
      }}
    >
      {/* Left: Title */}
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" component="div" gutterBottom sx={{ fontWeight: "bold" }}>
          Medidor de Energía
        </Typography>
      </Box>
      <Divider orientation="vertical" flexItem sx={{ mx: 2, display: { xs: "none", md: "block" }, borderWidth:2 }} />
      
      {/* Center: Description and Image */}
      <Box
        sx={{
          flex: 2,
          maxWidth: 700,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 2, textAlign: "center", lineHeight: 1.7 }}
        >
          Con el fin de garantizar información confiable, el sistema de powertick integra un medidor de energía de alta precisión, clasificados como clase 1 para energía real y clase 2 para energía reactiva según el estándar internacional EN62053-21/23.
        </Typography>
        <img
          src={GavazziMeter}
          alt="Medidor de Energía"
          style={{
            maxWidth: 400,
            height: "auto",
            marginTop: 16,
            borderRadius: 8,
          }}
        />
      </Box>
      {/* Right: List wrapped in a Card */}
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card elevation={3} sx={{ width: "100%", marginTop:10 }}>
          <CardContent sx={{margin: 1}}>
            <Typography
              component="div"
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "left", fontWeight:600 }}
            >
              3 decimales de precisión con mediciones de:
              <ul style={{ marginTop: 8, marginBottom: 0, lineHeight: 2, textAlign: "left" }}>
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
    </Box>
  </Box>
);

export default MedidorInfoCard;
