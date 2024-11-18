const { getConnection } = require("../db");

// Obtener todos los productos con filtros, orden y paginación
const getAllProducts = async (req, res) => {
  const { nombre, precioMin, precioMax, orden, categoria, pagina = 1, limite = 10 } = req.query;
  const offset = (pagina - 1) * limite;

  let connection;
  try {
    connection = await getConnection();

    let query = "SELECT * FROM productos WHERE 1=1";
    const params = [];

    // Filtrar por nombre
    if (nombre) {
      query += " AND nombre LIKE ?";
      params.push(`%${nombre}%`);
    }

    // Filtrar por precio mínimo
    if (precioMin) {
      query += " AND precio >= ?";
      params.push(precioMin);
    }

    // Filtrar por precio máximo
    if (precioMax) {
      query += " AND precio <= ?";
      params.push(precioMax);
    }

    // Filtrar por categoría
    if (categoria) {
      query += " AND categoria = ?";
      params.push(categoria);
    }

    // Ordenar por precio
    if (orden === "asc") {
      query += " ORDER BY precio ASC";
    } else if (orden === "desc") {
      query += " ORDER BY precio DESC";
    }

    // Paginación
    query += " LIMIT ? OFFSET ?";
    params.push(parseInt(limite), offset);

    // Ejecutar consulta principal
    const [products] = await connection.query(query, params);

    // Obtener el total de productos para calcular las páginas
    const [totalRows] = await connection.query(
      `SELECT COUNT(*) as total FROM productos WHERE 1=1 ${
        nombre ? "AND nombre LIKE ?" : ""
      } ${precioMin ? "AND precio >= ?" : ""} ${precioMax ? "AND precio <= ?" : ""} ${
        categoria ? "AND categoria = ?" : ""
      }`,
      params.slice(0, -2) // Excluir límite y offset
    );

    const totalProductos = totalRows[0]?.total || 0;

    res.json({
      productos: products || [], // Devolver un array vacío si no hay productos
      paginaActual: parseInt(pagina),
      totalPaginas: Math.ceil(totalProductos / limite),
      totalProductos,
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  } finally {
    if (connection) connection.release();
  }
};

// Eliminar un producto
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

// Actualizar un producto
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

// Agregar un nuevo producto
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
