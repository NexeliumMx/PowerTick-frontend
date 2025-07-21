import { Box, Typography, TextField, Button, Paper, MenuItem } from "@mui/material";
import { useState } from "react";

const industrias = [
  "Manufactura",
  "Energía",
  "Comercial",
  "Educación",
  "Salud",
  "Tecnología",
  "Otro",
];

const puestos = [
  "Director",
  "Gerente",
  "Ingeniero",
  "Técnico",
  "Consultor",
  "Otro",
];

const ContactSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    industria: "",
    puesto: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí es donde enviarías los datos del formulario a tu backend o servicio de correo
    setSubmitted(true);
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        pb: 15,
        pt:15,
        background: "linear-gradient(180deg, neutral.main 0%, background.default 100%)", // fallback if theme not available
        backgroundImage: (theme) =>
      `linear-gradient(180deg, ${theme.palette.neutral.main} 0%, ${theme.palette.background.default} 100%)`,
  }}
    >
      <Paper elevation={3} sx={{ px: 4, py: 2, pt:3, boxShadow: "none", maxWidth: 600, width: "100%" }}>
        <Typography variant="h4" gutterBottom sx={{fontWeight:700, mb:2}}>
          Contáctanos
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          ¿Tienes preguntas o quieres saber más? Completa el formulario y nos pondremos en contacto contigo.
        </Typography>
        {submitted ? (
          <Typography color="primary" sx={{ mt: 2 }}>
            ¡Gracias por contactarnos! Te responderemos pronto.
          </Typography>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nombre"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Correo electrónico"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Compañía"
              name="company"
              value={form.company}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField
                select
                label="Industria"
                name="industria"
                value={form.industria}
                onChange={handleChange}
                fullWidth
                required
              >
                {industrias.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Puesto"
                name="puesto"
                value={form.puesto}
                onChange={handleChange}
                fullWidth
                required
              >
                {puestos.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <TextField
              label="Mensaje"
              name="message"
              value={form.message}
              onChange={handleChange}
              fullWidth
              required
              multiline
              minRows={4}
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "primary.main",
                color: "white",
                "&:hover": {
                  backgroundColor: "secondary.main3",
                },
              }}
            >
              Enviar
            </Button>
          </form>
        )}
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Correo: contacto@nexelium.com.mx</Typography>
          <Typography variant="subtitle1">Teléfono: +52 55 4901 5789</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default ContactSection;
