const { get } = require("http")
const {mssql} = require("../config/db")

async function getComentarios(){
    const comentarios = await mssql.query("SELECT * FROM daroca.comentarios")
    return comentarios.recordset
}

async function postComentario(data){
    const {nome, idade, texto} = data
    await mssql.query(`INSERT INTO daroca.comentarios (nome, idade, texto) VALUES ('${nome}', '${idade}', '${texto}')`)
    return {mensagem: "Comentario feito com sucesso"}
}

module.exports = {getComentarios, postComentario}