const { mssql } = require("../config/db")
const bcrypt = require("bcrypt")

async function postUsers(data){
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
      frequencia,
      telefone
    } = data;

    const newSenha = await bcrypt.hash(senha, 10)

    const request = new mssql.Request()

    request.input("cpf", mssql.Char(11), cpf)
    request.input("nome_completo", mssql.VarChar(200), nomeCompleto)
    request.input("apelido_nome_social", mssql.VarChar(100), nomeSocial)
    request.input("data_nascimento", mssql.Date, dataNascimento)
    request.input("email", mssql.VarChar(255), email)
    request.input("senha", mssql.VarChar(255), newSenha)
    request.input("rua", mssql.VarChar(200), rua)
    request.input("bairro", mssql.VarChar(100), bairro)
    request.input("numero", mssql.VarChar(30), numero)
    request.input("cep", mssql.VarChar(20), cep)
    request.input("complemento", mssql.VarChar(150), complemento)
    request.input("ponto_referencia", mssql.VarChar(200), pontoReferencia)
    request.input("telefone_contato", mssql.VarChar(30), telefone)
    request.input("frequencia", mssql.Char(2), frequencia)
    
    const query = `
      INSERT INTO daroca.usuarios (cpf, nome_completo, apelido_nome_social, data_nascimento, email, senha, rua, bairro, numero, cep, complemento, ponto_referencia, frequencia, telefone_contato)
      VALUES (@cpf, @nome_completo, @apelido_nome_social, @data_nascimento, @email, @senha, @rua, @bairro, @numero, @cep, @complemento, @ponto_referencia, @frequencia, @telefone_contato)`
    await request.query(query)

    return {mensagem: "Usuario inserido com sucesso"}
}

async function searchUser(email){
    const request = new mssql.Request()

    request.input("email", mssql.VarChar(255), email)

    const query = `SELECT * FROM daroca.usuarios WHERE email = @email`
    const usuario = await request.query(query)

    return usuario.recordset[0]
}

async function getUser(nome){
  const request = new mssql.Request()

  request.input("nome", mssql.VarChar(200), nome)
  const query = `SELECT * FROM daroca.usuarios where nome_completo = @nome`
  const usuario = await request.query(query)
  return usuario.recordset[0]
}

module.exports = {postUsers, searchUser, getUser}