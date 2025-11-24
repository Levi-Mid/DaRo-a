const pedidoModel = require("../models/pedidosModel")

async function getPedido(req, res) {
    try{
        const id_usuario = req.user.id

        const pedidos = await pedidoModel.getPedidos(id_usuario)
        res.status(200).json({pedidos})
    }
    catch(Error){
        res.status(500).json({erro: "Erro interno no servidor " + Error})
    }
}

async function deletePedido(req, res) {
    try{
        const id = req.body.id

        const deletar = await pedidoModel.deletePedidos(id)
        if (deletar == 0){
            res.status(404).json({erro: "Pedido não encontrado"})
        }
        
        res.status(200).json({msg: "Pedido deletado com sucesso"})
    }
    catch(Erro){
        res.status(500).json({erro: "Erro interno no servidor"})
    }
}

module.exports = {getPedido, deletePedido}