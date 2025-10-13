const express = require("express")
const router = express.Router()
const usuarioController = require("../controllers/usuariosController")

router.post("/", usuarioController.postUsuario)

module.exports = router