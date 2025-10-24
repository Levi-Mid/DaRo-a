const express = require("express")
const router = express.Router()
const comentarioController = require("../controllers/comentariosController")
const {autenticar} = require("../services/auth")

router.get("/", comentarioController.mostrarComentarios)
router.post("/", autenticar, comentarioController.inserirComentario)

module.exports = router