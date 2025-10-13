const {mssql} = require("../config/db")

async function getProdutos(){
    const produtos = await mssql.query("SELECT * FROM daroca.produtos")
    return produtos.recordset
}

module.exports = {getProdutos}