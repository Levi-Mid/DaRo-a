const express = require("express")
const router = express.Router()
const usuarioController = require("../controllers/usuariosController")

router.post("/", usuarioController.postUsuario)
router.post("/login", usuarioController.login)

module.exports = router