import React from "react";
import { Box, Typography, Grid, Card, CardContent, Avatar } from "@mui/material";
import BeautyIcon from "@mui/icons-material/FaceRetouchingNatural";
import PerfumeIcon from "@mui/icons-material/LocalFlorist";
import SkincareIcon from "@mui/icons-material/Spa";

const SobreNosotros = () => {
  return (
    <Box sx={{ padding: "2rem", bgcolor: "#f9f9f9" }}>
      <Typography variant="h3" align="center" gutterBottom>
        Sobre Nosotros
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        En **Beauty Store**, nos apasiona realzar tu belleza natural. Ofrecemos
        una selección exclusiva de maquillaje, perfumes y productos de skincare
        diseñados para cuidar tu piel y destacar lo mejor de ti.
      </Typography>

      <Box sx={{ marginTop: "2rem" }}>
        <Typography variant="h4" gutterBottom align="center">
          Nuestros Valores
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ bgcolor: "#FFB6C1" }}>
              <CardContent>
                <Avatar sx={{ bgcolor: "#FF69B4", margin: "auto", width: 60, height: 60 }}>
                  <BeautyIcon />
                </Avatar>
                <Typography variant="h5" align="center" sx={{ marginTop: "1rem" }}>
                  Belleza Consciente
                </Typography>
                <Typography variant="body2" align="center">
                  Todos nuestros productos están seleccionados para ser amigables con tu piel y con el medio ambiente.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ bgcolor: "#FFB6C1" }}>
              <CardContent>
                <Avatar sx={{ bgcolor: "#FFD700", margin: "auto", width: 60, height: 60 }}>
                  <PerfumeIcon />
                </Avatar>
                <Typography variant="h5" align="center" sx={{ marginTop: "1rem" }}>
                  Exclusividad
                </Typography>
                <Typography variant="body2" align="center">
                  Trabajamos con marcas premium para ofrecerte productos únicos y de calidad excepcional.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ bgcolor: "#FFB6C1" }}>
              <CardContent>
                <Avatar sx={{ bgcolor: "#98FB98", margin: "auto", width: 60, height: 60 }}>
                  <SkincareIcon />
                </Avatar>
                <Typography variant="h5" align="center" sx={{ marginTop: "1rem" }}>
                  Cuidado Personal
                </Typography>
                <Typography variant="body2" align="center">
                  Nuestro objetivo es que te sientas bien contigo misma en cada paso del camino.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ marginTop: "3rem", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Tu experiencia, nuestra prioridad
        </Typography>
        <Typography variant="body2">
          En **Beauty Store**, nos esforzamos por ofrecer un servicio al cliente excepcional
          y productos que reflejen tu estilo y esencia.
        </Typography>
      </Box>
    </Box>
  );
};

export default SobreNosotros;
