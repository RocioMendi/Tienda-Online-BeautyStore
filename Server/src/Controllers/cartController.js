const db = require('../db'); // Conexión a MySQL configurada con mysql2

// Agregar un producto al carrito
const agregarAlCarrito = async (req, res) => {
  const { userId, productId, cantidad } = req.body;

  try {
    // Verificar si el producto ya está en el carrito
    const [item] = await db.execute(
      `SELECT * FROM cart WHERE userId = ? AND productId = ?`,
      [userId, productId]
    );

    if (item.length > 0) {
      // Si existe, actualizar la cantidad
      await db.execute(
        `UPDATE cart SET cantidad = cantidad + ? WHERE userId = ? AND productId = ?`,
        [cantidad, userId, productId]
      );
    } else {
      // Si no existe, agregar al carrito
      await db.execute(
        `INSERT INTO cart (userId, productId, cantidad) VALUES (?, ?, ?)`,
        [userId, productId, cantidad]
      );
    }

    res.json({ message: 'Producto agregado al carrito' });
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
};

// Obtener los productos del carrito de un usuario
const obtenerCarrito = async (req, res) => {
  const { userId } = req.params;

  try {
    const [cartItems] = await db.execute(
      `SELECT cart.*, productos.nombre, productos.precio 
       FROM cart 
       INNER JOIN productos ON cart.productId = productos.id 
       WHERE cart.userId = ?`,
      [userId]
    );

    const totalProductos = cartItems.length;
    const totalUnidades = cartItems.reduce((acc, item) => acc + item.cantidad, 0);
    const precioTotal = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    res.json({
      cartItems,
      totalProductos,
      totalUnidades,
      precioTotal,
    });
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
};

// Eliminar un producto del carrito
const eliminarDelCarrito = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    await db.execute(
      `DELETE FROM cart WHERE userId = ? AND productId = ?`,
      [userId, productId]
    );

    res.json({ message: 'Producto eliminado del carrito' });
  } catch (error) {
    console.error('Error al eliminar producto del carrito:', error);
    res.status(500).json({ error: 'Error al eliminar producto del carrito' });
  }
};

// Confirmar el pedido
const confirmarPedido = async (req, res) => {
  const { userId, direccionEnvio } = req.body;

  try {
    // Obtener los productos del carrito
    const [cartItems] = await db.execute(
      `SELECT cart.*, productos.nombre, productos.precio 
       FROM cart 
       INNER JOIN productos ON cart.productId = productos.id 
       WHERE cart.userId = ?`,
      [userId]
    );

    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío' });
    }

    // Calcular el precio total
    const totalPrice = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    // Crear la orden
    const [result] = await db.execute(
      `INSERT INTO orders (userId, totalPrice, direccionEnvio) VALUES (?, ?, ?)`,
      [userId, totalPrice, direccionEnvio]
    );

    const orderId = result.insertId;

    // Mover productos del carrito a la tabla order_products
    for (const item of cartItems) {
      await db.execute(
        `INSERT INTO order_products (orderId, productId, quantity, totalPrice) 
         VALUES (?, ?, ?, ?)`,
        [orderId, item.productId, item.cantidad, item.precio * item.cantidad]
      );
    }

    // Vaciar el carrito
    await db.execute(`DELETE FROM cart WHERE userId = ?`, [userId]);

    res.json({ message: 'Pedido confirmado', orderId });
  } catch (error) {
    console.error('Error al confirmar el pedido:', error);
    res.status(500).json({ error: 'Error al confirmar el pedido' });
  }
};

module.exports = {
  agregarAlCarrito,
  obtenerCarrito,
  eliminarDelCarrito,
  confirmarPedido,
};
