const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Verificar que exista el header
  if (!authHeader) {
    return res.status(401).json({ message: "Token requerido" });
  }

  // 2. Separar "Bearer TOKEN"
  const token = authHeader.split(" ")[1];

  try {
    // 3. Verificar token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secreto"
    );

    // 4. Guardar info del usuario
    req.usuario = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
