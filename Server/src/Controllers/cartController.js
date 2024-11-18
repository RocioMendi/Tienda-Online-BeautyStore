const getConnection = require('../db'); // Asegúrate de tener esta función que se conecta a tu base de datos

exports.addToCart = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  
  if (!user_id || !product_id || !quantity) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    const connection = await getConnection();
    const [result] = await connection.query(
      `INSERT INTO cart (user_id, product_id, quantity) 
       VALUES (?, ?, ?) 
       ON DUPLICATE KEY UPDATE quantity = quantity + ?`,
      [user_id, product_id, quantity, quantity]
    );
    connection.release();
    res.status(200).json({ message: 'Producto agregado al carrito', result });
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    res.status(500).json({ error: 'Error al agregar al carrito' });
  }
};

exports.getCart = async (req, res) => {
  const { user_id } = req.params;

  try {
    const connection = await getConnection();
    const [cart] = await connection.query('SELECT * FROM cart WHERE user_id = ?', [user_id]);
    connection.release();
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
};

exports.removeFromCart = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await getConnection();
    await connection.query('DELETE FROM cart WHERE id = ?', [id]);
    connection.release();
    res.status(200).json({ message: 'Producto eliminado del carrito' });
  } catch (error) {
    console.error('Error al eliminar del carrito:', error);
    res.status(500).json({ error: 'Error al eliminar del carrito' });
  }
};

exports.confirmOrder = async (req, res) => {
  // Lógica para vaciar el carrito después de la compra
};
