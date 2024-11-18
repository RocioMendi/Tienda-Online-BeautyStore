import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";

export default function CardProduct({ product }) {
  const agregarAlCarrito = async () => {
    try {
      await axios.post("http://localhost:5000/carrito", {
        productoId: product.id,
        quantity: 1, // Cantidad inicial
      });
      alert("Producto agregado al carrito");
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
      alert("Hubo un error al agregar el producto al carrito.");
    }
  };

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia
        sx={{ height: 250 }}
        image={product.imagen ? `/${product.imagen}` : "/default.jpg"}
        title={product.nombre}
      />
      <CardContent sx={{ textAlign: "center" }}>
        <Typography gutterBottom variant="h5" component="div">
          {product.nombre}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Precio: ${product.precio}
        </Typography>
      </CardContent>
      <CardActions>
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Button
            size="small"
            sx={{
              backgroundColor: "#FFB6C1",
              color: "black",
              mx: 1,
              "&:hover": {
                backgroundColor: "#fff",
                color: "black",
                border: "2px solid #FF69B4",
              },
            }}
            onClick={agregarAlCarrito} // Llama a la función
          >
            Agregar al carrito
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
