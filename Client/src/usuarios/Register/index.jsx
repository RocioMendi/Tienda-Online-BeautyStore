import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    direccion: "",
    telefono: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:5000/usuarios/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert("Error al registrar el usuario");
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
          Regístrate
        </Typography>
        {["nombre", "email", "password", "direccion", "telefono"].map((field) => (
          <TextField
            key={field}
            fullWidth
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            name={field}
            variant="outlined"
            margin="normal"
            value={formData[field]}
            onChange={handleChange}
            InputLabelProps={{ style: { color: "#FFB6C1" } }}
            InputProps={{
              style: { color: "#FFB6C1" },
            }}
            sx={{
              fieldset: { borderColor: "#FFB6C1" },
            }}
          />
        ))}
        <Button
          fullWidth
          variant="contained"
          onClick={handleRegister}
          sx={{
            backgroundColor: "#FFB6C1",
            color: "black",
            marginTop: "1rem",
            "&:hover": { backgroundColor: "#FFC0CB" },
          }}
        >
          Registrarse
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
