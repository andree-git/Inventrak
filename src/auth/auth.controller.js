const { loginService } = require("./auth.service");

const login = async (req, res) => {
  try {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
      return res.status(400).json({
        message: "Usuario y contraseña son requeridos",
      });
    }

    const result = await loginService(usuario, password);

    res.json(result);
  } catch (error) {
    res.status(401).json({
      message: error.message || "Error al iniciar sesión",
    });
  }
};

module.exports = { login };
