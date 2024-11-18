const { getConnection } = require("../db");

const getAllProducts = async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const [results] = await connection.query("SELECT * FROM productos");
    res.json(results);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  } finally {
    if (connection) connection.release();
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query("DELETE FROM productos WHERE id = ?", [id]);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: `Producto con ID ${id} eliminado correctamente.` });
    } else {
      res.status(404).json({ error: `Producto con ID ${id} no encontrado.` });
    }
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  } finally {
    if (connection) connection.release();
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, imagen } = req.body;

  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      "UPDATE productos SET nombre = ?, precio = ?, imagen = ? WHERE id = ?",
      [nombre, precio, imagen, id]
    );

    if (result.affectedRows > 0) {
      res.status(200).json({ message: `Producto con ID ${id} actualizado correctamente.` });
    } else {
      res.status(404).json({ error: `Producto con ID ${id} no encontrado.` });
    }
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ error: "Error al actualizar el producto" });
  } finally {
    if (connection) connection.release();
  }
};

const addProduct = async (req, res) => {
  const { nombre, precio, imagen } = req.body;

  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      "INSERT INTO productos (nombre, precio, imagen) VALUES (?, ?, ?)",
      [nombre, precio, imagen]
    );
    res.status(201).json({ message: "Producto agregado", id: result.insertId });
  } catch (error) {
    console.error("Error al agregar el producto:", error);
    res.status(500).json({ error: "Error al agregar el producto" });
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getAllProducts, deleteProduct, updateProduct, addProduct };

