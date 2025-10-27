const {mssql} = require("../config/db")

async function getProdutos(){
    const produtos = await mssql.query("SELECT * FROM daroca.produtos")
    return produtos.recordset
}

async function getProdutoEspecifico(nome){
    const request = new mssql.Request()

    request.input("nome", mssql.VarChar(30), nome + '%')

    const query = `SELECT * FROM daroca.produtos WHERE nome LIKE @nome`
    const produtos = await request.query(query)
    return produtos.recordset
}

module.exports = {getProdutos, getProdutoEspecifico}