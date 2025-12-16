const express = require("express");
const router = express.Router();
const controller = require("./usuario.controller");
const auth = require("../auth/auth.middleware");

// solo admin
router.use(auth);

router.get("/", controller.getUsuarios);
router.post("/", controller.createUsuario);
router.put("/:id", controller.updateUsuario);
router.patch("/:id/estado", controller.toggleUsuario);
router.delete("/:id", controller.deleteUsuario);

module.exports = router;
