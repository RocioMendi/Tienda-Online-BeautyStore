import React, { useEffect, useState } from "react";
import CardProduct from "../CardProduct";
import Box from "@mui/material/Box";
import axios from "axios";

const ListProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/productos"); // URL corregida
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 2, // Espaciado entre tarjetas
        marginTop: 4,
      }}
    >
      {products.map((product, index) => (
        <Box
          key={product.id}
          sx={{
            flex: "0 0 22%", // Ancho fijo para cada tarjeta (22% del contenedor)
            maxWidth: "22%",
            mb: 2, // Espaciado inferior entre las filas
          }}
        >
          <CardProduct product={product} />
        </Box>
      ))}
    </Box>
  );
};

export default ListProduct;

