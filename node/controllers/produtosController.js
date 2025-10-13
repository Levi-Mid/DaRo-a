const productModel = require("../models/produtosModel")

async function mostrarProdutos(req, res) {
    const produtos = await productModel.getProdutos()
    res.json(produtos)
}

module.exports = {mostrarProdutos}