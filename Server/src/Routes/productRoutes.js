const express = require("express");
const {
  getAllProducts,
  deleteProduct,
  updateProduct,
  addProduct,
} = require("../Controllers/productoController");

const router = express.Router();

router.get("/", getAllProducts);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);
router.post("/", addProduct);

module.exports = router;
