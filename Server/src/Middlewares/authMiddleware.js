const { getConnection } = require("../db");

const authMiddleware = async (req, res, next) => {
  const { email, password } = req.headers;

  if (!email || !password) {
    return res.status(401).json({ message: "Credenciales no proporcionadas" });
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

    req.user = results[0];
    next();
  } catch (error) {
    res.status(500).json({ message: "Error al verificar las credenciales" });
  }
};

const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.admin !== 1) {
    return res.status(403).json({ message: "Acceso denegado" });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };

