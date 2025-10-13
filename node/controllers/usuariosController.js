const usersModel = require("../models/usuariosModel")

async function postUsuario(req, res) {
    try{
        const post = await usersModel.postUsers(req.body)
        res.status(201).json(post)
    }
    catch (error){
        res.status(400).json({erro: "Erro ao inserir usuario"})
    }
}

module.exports = {postUsuario}