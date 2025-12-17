const {
  getProductosService,
  getProductoByIdService,
  createProductoService,
  updateProductoService,
  deleteProductoService,
  getProductosRiesgoService,
} = require("./productos.service");

const getProductos = async (req, res) => {
  try {
    const productos = await getProductosService();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos" });
  }
};

const getProductoById = async (req, res) => {
  try {
    const producto = await getProductoByIdService(Number(req.params.id));
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener producto" });
  }
};

const createProducto = async (req, res) => {
  try {
    const producto = await createProductoService(req.body);
    res.status(201).json(producto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProducto = async (req, res) => {
  try {
    const producto = await updateProductoService(
      Number(req.params.id),
      req.body
    );
    res.json(producto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProducto = async (req, res) => {
  try {
    await deleteProductoService(Number(req.params.id));
    res.json({ message: "Producto desactivado correctamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getProductosRiesgo = async (req, res) => {
  try {
    const productos = await getProductosRiesgoService();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos en riesgo" });
  }
};

module.exports = {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
  getProductosRiesgo,
};
