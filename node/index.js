require("dotenv").config();
const porta = process.env.PORTA;
const stringSQL = process.env.CONNECTION_STRING;
const express = require('express');
const app = express();
const mssql = require('mssql');
const cors = require('cors');

app.use(cors());

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

// rota para buscar os dados http://localhost:8088/produtos
app.get('/produtos', async (req, res) => {
    const alunos = await mssql.query("SELECT * FROM daroca.produtos")
    console.log(alunos.recordset)
    res.json(alunos.recordset);
})

// http://localhost:8088/usuarios
app.post('/usuarios', (req, res) => {
try {
    const cpf = req.body.cpf;
    const nomeCompleto = req.body.nomeCompleto;
    const nomeSocial = req.body.nomeSocial;
    const dataNascimento = req.body.dataNascimento;
    const email = req.body.email;
    const senha = req.body.senha;
    const rua = req.body.rua;
    const bairro = req.body.bairro;
    const numero = req.body.numero;
    const cep = req.body.cep;
    const complemento = req.body.complemento;
    const pontoReferencia = req.body.pontoReferencia;
    const telefone = req.body.telefone;

    mssql.query(`INSERT INTO daroca.usuarios (cpf, nome_completo, apelido_nome_social, data_nascimento,  email, senha,  rua, bairro,  numero, cep, complemento, ponto_referencia, telefone_contato) VALUES
    (${cpf},'${nomeCompleto}','${nomeSocial}', ${dataNascimento}, '${email}', '${senha}', '${rua}','${bairro}',${numero},${cep},'${complemento}','${pontoReferencia}',${telefone})`)
    res.status(201).json({ "mensagem": "Dados inseridos com sucesso."})
    }
catch (erro){
    console.log("Erro na inserção de dados.",erro)
    }
})


// rota principal
app.use('/', (req, res) => res.json({ mensagem: 'Servidor em execução' }))
// iniciar o servidor
app.listen(porta, () => console.log("API funcionando!"))