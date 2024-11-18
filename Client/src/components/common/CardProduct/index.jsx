import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CartContext } from "../../store/cartContext"; // Importa el contexto del carrito

export default function CardProduct({ product }) {
  const { addToCart } = useContext(CartContext); // Usa el contexto del carrito

  const agregarAlCarrito = () => {
    addToCart(product); // Agrega el producto al carrito desde el contexto
    alert("Producto agregado al carrito");
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
            onClick={agregarAlCarrito} // Llama a la función del contexto
          >
            Agregar al carrito
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
