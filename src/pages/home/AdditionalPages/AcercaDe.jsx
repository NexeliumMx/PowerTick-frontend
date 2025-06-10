import { Box, Divider, Typography } from "@mui/material";
import SignBar from "../components/SignBar";
import ExtraInfoFooter from "../components/ExtraInfoFooter";
import about1 from "./HomePagesMedia/about1.jpg";
import monograma_claro_recortado from "./HomePagesMedia/monograma_claro_recortado.png";

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
              Desde el año 2025, nuestra visión y compromiso es ofrecerte una experiencia cada vez más robusta,
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
      <Box
  sx={{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "background.default",
    p: 10,
    width: "100%",
  }}
>
  <Box
    sx={{
      width: { xs: "100%", md: "50%" },
      minWidth: { xs: "120px", md: "150px" },
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      mr: { xs: 2, md: 4 },
    }}
  >
    <img
      src={monograma_claro_recortado}
      alt="Logo Nexelium"
      style={{
        width: "100%",
        height: "auto",
        maxWidth: 300,
      }}
    />
  </Box>
  <Box
    sx={{
      width: { xs: "100%", md: "50%" },
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      textAlign:"justified",
    }}
  >
    <Typography variant="h2" color="secondary.main2" fontWeight={700} gutterBottom marginBottom={4}>
      Tecnología diseñada y administrada por Nexelium Technological Solutions
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ maxWidth: "800px", lineHeight: 2, textAlign: "justify" }}>
      Powertick es una plataforma desarrollada y administrada por Nexelium, una empresa mexicana comprometida con la innovación y la optimización de recursos en la industria. Fundada en 2024, Nexelium combina electrónica, telecomunicaciones y computación para crear soluciones estratégicas que mejoran la eficiencia operativa y promueven la sustentabilidad.
      Con un enfoque en evolución constante, Nexelium garantiza que Powertick continúe ofreciendo herramientas avanzadas para el monitoreo y gestión energética. Su tecnología no solo mide, sino que transforma la manera en que las empresas comprenden y optimizan su consumo, fortaleciendo procesos y reduciendo costos.
      A través de Powertick, Nexelium reafirma su compromiso con el desarrollo de soluciones tecnológicas que impulsen industrias más inteligentes y sostenibles.
    </Typography>
    
    <Typography
  variant="body1"
  color="text.secondary"
  sx={{ mt: 2 }}
>
  Conoce más en su sitio web&nbsp;
  <Box
    component="a"
    href="https://nexelium.com.mx"
    target="_blank"
    rel="noopener noreferrer"
    sx={{
      color: "secondary.main2",
      textDecoration: "underline",
      fontWeight: 600,
      fontSize: "inherit",
    }}
  >
    aquí
  </Box>
</Typography>
  </Box>
</Box>      <Box>
        <ExtraInfoFooter />
      </Box>
    </Box>
  );
}