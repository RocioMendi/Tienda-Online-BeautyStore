import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);

        // Redirigir al dashboard si el usuario es administrador
        if (data.user.admin === 1) {
          navigate("/admin");
        } else {
          navigate("/productos"); // O cualquier página para usuarios normales
        }
      } else {
        alert(data.message); // Mostrar mensaje de error si ocurre algo
      }
    } catch (error) {
      alert("Error al iniciar sesión");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fdeaf2",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "90%",
          maxWidth: "400px",
          padding: "2rem",
          backgroundColor: "#202020",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: "center",
            color: "#FFB6C1",
            marginBottom: "1.5rem",
          }}
        >
          Iniciar Sesión
        </Typography>
        <TextField
          fullWidth
          label="Email"
          name="email"
          variant="outlined"
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          InputLabelProps={{ style: { color: "#FFB6C1" } }}
          InputProps={{
            style: { color: "#FFB6C1" },
          }}
          sx={{
            fieldset: { borderColor: "#FFB6C1" },
          }}
        />
        <TextField
          fullWidth
          label="Contraseña"
          name="password"
          type="password"
          variant="outlined"
          margin="normal"
          value={formData.password}
          onChange={handleChange}
          InputLabelProps={{ style: { color: "#FFB6C1" } }}
          InputProps={{
            style: { color: "#FFB6C1" },
          }}
          sx={{
            fieldset: { borderColor: "#FFB6C1" },
          }}
        />
        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
          sx={{
            backgroundColor: "#FFB6C1",
            color: "black",
            marginTop: "1rem",
            "&:hover": { backgroundColor: "#FFC0CB" },
          }}
        >
          Ingresar
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
