import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { useState } from "react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the form data to your backend or email service
    setSubmitted(true);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        my: 6,
        px: 2,
      }}
    >
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
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
            <Button type="submit" variant="contained" color="primary">
              Enviar
            </Button>
          </form>
        )}
        <Box sx={{ mt: 4 }}>
          <Typography variant="subtitle1">Correo: soporte@powertick.com</Typography>
          <Typography variant="subtitle1">Teléfono: +52 55 1234 5678</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default ContactSection;
