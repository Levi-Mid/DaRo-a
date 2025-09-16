require("dotenv").config();
const porta = process.env.PORTA;
const stringSQL = process.env.CONNECTION_STRING;
const express = require('express');
const app = express();
const mssql = require('mssql');
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost'
}));

app.use(express.json())

async function conectaBD(){
    try {
        await mssql.connect(stringSQL);
        console.log("BD conectado com sucesso.");
        }
    catch (error) {
        console.log("Erro na conexão com o BD", error);
    }
}

conectaBD()

// rota para buscar os dados http://localhost:8081/produtos
app.get('/produtos', async (req, res) => {
    const alunos = await mssql.query("SELECT * FROM daroca.produtos")
    console.log(alunos.recordset)
    res.json(alunos.recordset);
})

// rota principal
app.use('/', (req, res) => res.json({ mensagem: 'Servidor em execução' }))
// iniciar o servidor
app.listen(porta, () => console.log("API funcionando!"))