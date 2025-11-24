const express = require("express");
const router = express.Router();
const carrinhoController = require("../controllers/carrinhoController");
const {autenticar} = require("../services/auth")

// Remover item
router.delete("/item/:id_item", autenticar,carrinhoController.removerItem);

// Adicionar produto ao carrinho
router.post("/", autenticar, carrinhoController.adicionarAoCarrinho);

// Buscar itens do carrinho
router.get("/", autenticar, carrinhoController.mostrarCarrinho);

router.post("/final", autenticar, carrinhoController.finalizarCarrinho)

module.exports = router;
