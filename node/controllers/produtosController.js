const productModel = require("../models/produtosModel")

async function mostrarProdutos(req, res) {
    const produtos = await productModel.getProdutos()
    res.json(produtos)
}

async function mostrarProdutoEspecifico(req, res) {
    const produtos = await productModel.getProdutoEspecifico(req.params.nome)
    res.json(produtos)
}

module.exports = {mostrarProdutos, mostrarProdutoEspecifico}