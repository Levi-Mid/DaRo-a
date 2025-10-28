const {mssql} = require("../config/db")

async function getComentarios(){
    const comentarios = await mssql.query("SELECT * FROM daroca.comentarios")
    return comentarios.recordset
}

async function postComentario(data){
    const {nome, texto} = data

    const request = new mssql.Request()

    request.input("nome", mssql.VarChar(100), nome)
    request.input("texto", mssql.NVarChar(mssql.MAX), texto)

    const query = `INSERT INTO daroca.comentarios (nome, texto) VALUES (@nome,  @texto)`
    await request.query(query)
    return {mensagem: "Comentario feito com sucesso"}
}

module.exports = {getComentarios, postComentario}