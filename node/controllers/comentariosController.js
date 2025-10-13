const commentModel = require("../models/comentariosModel")

async function mostrarComentarios(req, res){
    const comentarios = await commentModel.getComentarios()
    res.json(comentarios)
}

async function inserirComentario(req, res) {
    try{
        const resultado = await commentModel.postComentario(req.body)
        res.status(201).json(resultado)
    }
    catch (error){
        res.status(400).json({erro: "Erro ao comentar"})
    }
}

module.exports = {mostrarComentarios, inserirComentario}