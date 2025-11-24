const express = require("express")
const router = express.Router()
const pedidoController = require("../controllers/pedidosController")
const {autenticar} = require("../services/auth")

router.get("/", autenticar, pedidoController.getPedido)
router.delete("/", autenticar, pedidoController.deletePedido)

module.exports = router