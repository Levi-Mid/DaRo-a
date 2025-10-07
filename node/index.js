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

app.get('/usuario',async (req, res) => {
    const usuario = await mssql.query("SELECT * FROM daroca.usuarios")
    console.log(usuario.recordset)
    res.json(usuario.recordset);
})

// http://localhost:8088/usuarios
app.post('/usuarios', async (req, res) => {
  try {
    const {
      cpf,
      nomeCompleto,
      nomeSocial,
      dataNascimento,
      email,
      senha,
      rua,
      bairro,
      numero,
      cep,
      complemento,
      pontoReferencia,
      telefone
    } = req.body;

    await mssql.query(`
      INSERT INTO daroca.usuarios 
      (cpf, nome_completo, apelido_nome_social, data_nascimento, email, senha, rua, bairro, numero, cep, complemento, ponto_referencia, telefone_contato)
      VALUES ('${cpf}', '${nomeCompleto}', '${nomeSocial}', '${dataNascimento}', '${email}', '${senha}', '${rua}', '${bairro}', '${numero}', '${cep}', '${complemento}', '${pontoReferencia}', '${telefone}')
    `);

    res.status(201).json({ mensagem: "Dados inseridos com sucesso." });
  } catch (erro) {
    console.error("Erro na inserção de dados:", erro);
    res.status(500).json({ erro: "Erro na inserção de dados." });
  }
});


// rota principal
app.use('/', (req, res) => res.json({ mensagem: 'Servidor em execução' }))
// iniciar o servidor
app.listen(porta, () => console.log("API funcionando!"))