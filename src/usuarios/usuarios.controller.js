const {
  getUsuariosService,
  getUsuarioByIdService,
  createUsuarioService,
  updateUsuarioService,
  deleteUsuarioService,
} = require("./usuarios.service");

const getUsuarios = async (req, res) => {
  try {
    const usuarios = await getUsuariosService();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

const getUsuarioById = async (req, res) => {
  try {
    const usuario = await getUsuarioByIdService(Number(req.params.id));
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario" });
  }
};

const createUsuario = async (req, res) => {
  try {
    const usuario = await createUsuarioService(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUsuario = async (req, res) => {
  try {
    const usuario = await updateUsuarioService(
      Number(req.params.id),
      req.body
    );
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUsuario = async (req, res) => {
  try {
    await deleteUsuarioService(Number(req.params.id));
    res.json({ message: "Usuario desactivado correctamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
