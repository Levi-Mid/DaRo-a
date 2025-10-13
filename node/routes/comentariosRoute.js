const express = require("express")
const router = express.Router()
const comentarioController = require("../controllers/comentariosController")

router.get("/", comentarioController.mostrarComentarios)
router.post("/", comentarioController.inserirComentario)

module.exports = router