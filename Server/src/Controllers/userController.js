const { getConnection } = require("../db");

const registerUser = async (req, res) => {
  const { nombre, email, password, direccion, telefono } = req.body;

  if (!nombre || !email || !password || !direccion || !telefono) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const connection = await getConnection();

    // Verificar si el correo ya está registrado
    const [existingUser] = await connection.execute(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    // Insertar usuario
    await connection.execute(
      "INSERT INTO usuarios (nombre, email, password, direccion, telefono, admin) VALUES (?, ?, ?, ?, ?, 0)",
      [nombre, email, password, direccion, telefono]
    );

    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const connection = await getConnection();
    const [results] = await connection.execute(
      "SELECT * FROM usuarios WHERE email = ? AND password = ?",
      [email, password]
    );

    if (results.length === 0) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const user = results[0];
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      user: { id: user.id, nombre: user.nombre, email: user.email, admin: user.admin },
    });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

module.exports = { registerUser, loginUser };
