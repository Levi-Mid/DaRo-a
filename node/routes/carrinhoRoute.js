const express = require("express");
const router = express.Router();
const carrinhoController = require("../controllers/carrinhoController");

// Remover item
router.delete("/item/:id_item", carrinhoController.removerItem);

// Adicionar produto ao carrinho
router.post("/", carrinhoController.adicionarAoCarrinho);

// Buscar itens do carrinho
router.get("/", carrinhoController.mostrarCarrinho);

module.exports = router;
