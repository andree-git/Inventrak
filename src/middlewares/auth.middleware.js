const jwt = require("jsonwebtoken");

/**
 * Verifica que el token JWT sea válido
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token requerido",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Token inválido o expirado",
      });
    }

    req.user = user; // { id, usuario, rol }
    next();
  });
};

/**
 * Verifica roles (ADMIN, VENDEDOR)
 */
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.rol)) {
      return res.status(403).json({
        message: "No tienes permisos para esta acción",
      });
    }
    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeRoles,
};
