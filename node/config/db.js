require("dotenv").config()
const mssql = require("mssql")

const sql = process.env.CONNECTION_STRING

async function conectaBD(){
    try{
        await mssql.connect(sql)
        console.log("Conectado ao banco de dados")
    }
    catch (error){
        console.error("Erro na conexão com o banco de dados")
    }
}

module.exports = {mssql, conectaBD}