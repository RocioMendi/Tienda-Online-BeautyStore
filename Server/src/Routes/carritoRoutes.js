/* const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Rutas del carrito
router.post('/add', cartController.agregarAlCarrito); // Agregar producto al carrito
router.get('/:userId', cartController.obtenerCarrito); // Obtener carrito por usuario
router.delete('/remove', cartController.eliminarDelCarrito); // Eliminar producto del carrito

// Ruta para confirmar el pedido
router.post('/checkout', cartController.confirmarPedido);

module.exports = router;
 */