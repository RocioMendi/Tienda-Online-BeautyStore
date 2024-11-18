import React, { useState, useEffect } from "react";
import CardProduct from "../CardProduct"; // Componente para cada producto
import axios from "axios";
import { Box, TextField, Button, Select, MenuItem, Pagination, Typography } from "@mui/material";

export default function ListProduct() {
  const [productos, setProductos] = useState([]);
  const [filters, setFilters] = useState({
    nombre: "",
    precioMin: "",
    precioMax: "",
    orden: "",
    categoria: "",
  });
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  // Obtener productos desde el backend con filtros y paginación
  const fetchProductos = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/productos", {
        params: { ...filters, pagina },
      });
      setProductos(data.productos || []);
      setTotalPaginas(data.totalPaginas || 1);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  // Llamar a la función al cargar el componente y cuando cambien los filtros o la página
  useEffect(() => {
    fetchProductos();
  }, [filters, pagina]);

  // Manejar cambios en los filtros
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Manejar cambio de página
  const handlePageChange = (event, value) => {
    setPagina(value);
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Filtros */}
      <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
        <TextField
          name="nombre"
          label="Buscar por nombre"
          onChange={handleFilterChange}
          variant="outlined"
          size="small"
        />
        <TextField
          name="precioMin"
          label="Precio mínimo"
          type="number"
          onChange={handleFilterChange}
          variant="outlined"
          size="small"
        />
        <TextField
          name="precioMax"
          label="Precio máximo"
          type="number"
          onChange={handleFilterChange}
          variant="outlined"
          size="small"
        />
        <Select
          name="orden"
          value={filters.orden}
          onChange={handleFilterChange}
          displayEmpty
          size="small"
        >
          <MenuItem value="">Ordenar por precio</MenuItem>
          <MenuItem value="asc">Ascendente</MenuItem>
          <MenuItem value="desc">Descendente</MenuItem>
        </Select>
        <TextField
          name="categoria"
          label="Categoría"
          onChange={handleFilterChange}
          variant="outlined"
          size="small"
        />
        <Button
          variant="contained"
          size="small"
          onClick={fetchProductos}
          sx={{ backgroundColor: "#FFB6C1", "&:hover": { backgroundColor: "#FF69B4" } }}
        >
          Aplicar filtros
        </Button>
      </Box>

      {/* Lista de productos */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center" }}>
        {Array.isArray(productos) && productos.length > 0 ? (
          productos.map((product) => <CardProduct key={product.id} product={product} />)
        ) : (
          <Typography variant="body1" sx={{ mt: 4 }}>
            No se encontraron productos con los filtros aplicados.
          </Typography>
        )}
      </Box>

      {/* Paginación */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={totalPaginas}
          page={pagina}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
}
