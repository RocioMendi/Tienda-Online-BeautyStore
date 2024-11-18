import React, { useContext } from "react";
import { CartContext } from "../../store/cartContext"; // Ajusta la ruta si es diferente
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Cart = () => {
  const { cartItems, getTotalAmount, clearCart } = useContext(CartContext);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, textAlign: "center" }}>
        Carrito de Compras
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Tu carrito está vacío.
        </Typography>
      ) : (
        <Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
            }}
          >
            {cartItems.map((item) => (
              <Card key={item.id} sx={{ maxWidth: 345, m: 2 }}>
                <CardMedia
                  sx={{ height: 200 }}
                  image={item.imagen ? `/${item.imagen}` : "/default.jpg"}
                  title={item.nombre}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {item.nombre}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Cantidad: {item.quantity}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Precio Unitario: ${item.precio}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Subtotal: ${item.precio * item.quantity}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h5">
              Total: ${getTotalAmount().toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={clearCart}
              sx={{ mt: 2 }}
            >
              Vaciar carrito
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
