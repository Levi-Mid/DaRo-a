const usersModel = require("../models/usuariosModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

async function postUsuario(req, res) {
    try{
        const post = await usersModel.postUsers(req.body)
        res.status(201).json(post)
    }
    catch (error){
        res.status(400).json({erro: "Erro ao inserir usuario"})
    }
}

require("dotenv").config()
const SECRET = process.env.SECRET

async function login(req, res) {
    try{
        const {email, senha} = req.body

        const usuario = await usersModel.searchUser(email)
        if (!usuario) res.status(404).json("Usuario não encontrado")

        const senhaValida = await bcrypt.compare(senha, usuario.senha)
        if (!senhaValida) res.status(401).json({msg: "Senha incorreta"})

        const token = jwt.sign({nome: usuario.nome_completo, email: usuario.email, id: usuario.id_usuario}, SECRET, { expiresIn: "24h" })
        res.json({token})
    }
    catch (err){
        res.status(500).json({erro: err.message})
    }
}

async function getNome(req, res) {
    try{
        const nome = req.user.nome
        
        res.json({nome})
    }
    catch{
        res.status(500).json({erro: err.message})
    }
}

module.exports = {postUsuario, login, getNome}