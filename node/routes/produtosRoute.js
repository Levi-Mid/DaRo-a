const express = require("express")
const router = express.Router()
const produtosController = require("../controllers/produtosController")

router.get("/", produtosController.mostrarProdutos)
router.get("/:nome", produtosController.mostrarProdutoEspecifico)

module.exports = router