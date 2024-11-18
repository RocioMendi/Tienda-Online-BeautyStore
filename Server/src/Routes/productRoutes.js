const express = require("express");
const {
  getAllProducts,
  deleteProduct,
  updateProduct,
  addProduct,
} = require("../Controllers/productoController");

const router = express.Router();

// Ruta para obtener productos con filtros
router.get("/", getAllProducts);

// Ruta para eliminar un producto
router.delete("/:id", deleteProduct);

// Ruta para actualizar un producto
router.put("/:id", updateProduct);

// Ruta para agregar un producto
router.post("/", addProduct);

module.exports = router;
