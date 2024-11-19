import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";

const Contacto = () => {
  return (
    <Box
      sx={{
        padding: "2rem",
        bgcolor: "#f9f9f9",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "2rem",
          maxWidth: "600px",
          width: "100%",
          bgcolor: "#FFB6C1",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Contáctanos
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          ¿Tienes alguna pregunta o sugerencia? Completa el formulario y nos
          pondremos en contacto contigo lo antes posible.
        </Typography>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre Completo"
                variant="outlined"
                required
                sx={{ bgcolor: "#ffffff" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Correo Electrónico"
                type="email"
                variant="outlined"
                required
                sx={{ bgcolor: "#ffffff" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Asunto"
                variant="outlined"
                required
                sx={{ bgcolor: "#ffffff" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mensaje"
                variant="outlined"
                required
                multiline
                rows={4}
                sx={{ bgcolor: "#ffffff" }}
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: "#FF69B4",
                  ":hover": { bgcolor: "#FF1493" },
                }}
              >
                Enviar Mensaje
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default Contacto;
