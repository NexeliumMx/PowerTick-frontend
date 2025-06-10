import { Box, Divider, Typography } from "@mui/material";
import SignBar from "../components/SignBar";
import ExtraInfoFooter from "../components/ExtraInfoFooter";
import about1 from "./about1.jpg";

export default function AcercaDe() {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "white", display: "flex", flexDirection: "column" }}>
      <SignBar />
      <Box sx={{ flex: 1, px: { xs: 2, md: 6 }, py: 4, maxWidth: "100%", mx: "auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography
          variant="h2"
          color="primary.main"
          fontWeight={700}
          gutterBottom
          sx={{ textAlign: "center" }}
        >
          Acerca de Nosotros
        </Typography>
        <Divider
          sx={{
            mb: 2,
            borderColor: "secondary.main2",
            borderBottomWidth: 5,
            borderRadius: 2,
            opacity: 1,
            width: "200px",
            mx: "auto",
          }}
        />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 4,
            mt: 2,
          }}
        >
          <Box sx={{ maxWidth: { xs: "100%", md: "50%" }, alignContent: "flex-start", textAlign: "justify", lineHeight: 1.6 }}>
            <Typography variant="body1" color="primary" lineHeight={2}>
              Creemos que la energía no solo debe medirse, sino comprenderse.
              Nuestro sistema de monitoreo energético nace del compromiso con
              un uso más inteligente, estratégico y responsable de la energía.
              Va más allá del ahorro: busca garantizar la calidad de la energía
              con la que se alimentan los sistemas, procesos y activos de una
              instalación.
              Porque una energía de mala calidad debilita a las máquinas,
              acorta su vida útil y pone en riesgo la continuidad operativa disparando
              los costos de operación por fallos inesperados, penalizaciones y uso ineficiente de la energía.
              En cambio, una energía bien gestionada fortalece. Hace que los
              procesos sean más eficientes, los entornos más seguros y las
              decisiones más conscientes.
              Este sistema es una herramienta de empoderamiento: permite a las
              personas visualizar en tiempo real y analizar los antescendentes de lo invisible,
              anticipar riesgos, detectar oportunidades y transformar datos en acciones. Al integrar tecnología con capacidades humanas, ayudamos a construir operaciones más robustas, sostenibles y preparadas para el futuro.
            </Typography>
            <Typography variant="body1" color="primary" mt={2} lineHeight={2}>
              Nuestra visión y compromiso es ofrecerte una experiencia cada vez más robusta,
               eficiente y alineada con tus necesidades, creciendo a tu lado. Revisamos y 
               evolucionamos constantemente nuestras herramientas para asegurar un desempeño 
               confiable, mayor facilidad de uso, y nuevas funciones de monitoreo y análisis 
               que potencien tu gestión energética. Consulta nuestro apartado de novedades para
                acceder a detalles técnicos acerca de las actualizaciones y descubrir cómo
                 aprovechar al máximo las nuevas funcionalidades.
            </Typography>
          </Box>
          <Box
            sx={{
              maxWidth: { xs: "100%", md: "50%" },
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: { xs: 3, md: 0 },
            }}
          >
            <img
              src={about1}
              alt="Equipo PowerTick"
              style={{
                width: "100%",
                height: 480, // Bigger image
                borderRadius: 12,
                boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
                objectFit: "cover",
                objectPosition: "bottom", // Show upper half if cropped
                maxWidth: 600,
              }}
            />
          </Box>
        </Box>
    
      </Box>
      <Box sx={{ textAlign: "center", maxWidth: "100%", backgroundColor: "background.default", p: 2}}>
        <Typography variant="h4" color="white" fontWeight={700} gutterBottom>
          Tecnología diseñada y administrada por Nexelium
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: "800px", mx: "auto", lineHeight: 1.6 }}>
          En PowerTick, estamos comprometidos con la mejora continua y la innovación constante. Nuestro equipo trabaja incansablemente para ofrecerte las mejores herramientas de monitoreo energético, asegurando que cada actualización aporte valor real a tu operación.
        </Typography>


    </Box>
      <Box sx={{ mt: "auto" }}>
        <ExtraInfoFooter />
      </Box>
    </Box>
  );
}