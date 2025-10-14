const {mssql} = require("../config/db")

async function getProdutos(){
    const produtos = await mssql.query("SELECT * FROM daroca.produtos")
    return produtos.recordset
}

async function getProdutoEspecifico(nome){
    const produtos = await mssql.query(`SELECT * FROM daroca.produtos WHERE nome LIKE '${nome}%'`)
    return produtos.recordset
}

module.exports = {getProdutos, getProdutoEspecifico}