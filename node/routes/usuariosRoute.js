const express = require("express")
const router = express.Router()
const usuarioController = require("../controllers/usuariosController")
const {autenticar} = require("../services/auth") 

router.post("/", usuarioController.postUsuario)
router.post("/login", usuarioController.login)
router.get("/", autenticar, usuarioController.getNome)

module.exports = router