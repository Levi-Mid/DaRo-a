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
    
    await mssql.query(`
      INSERT INTO daroca.usuarios 
      (cpf, nome_completo, apelido_nome_social, data_nascimento, email, senha, rua, bairro, numero, cep, complemento, ponto_referencia, frequencia, telefone_contato)
      VALUES ('${cpf}', '${nomeCompleto}', '${nomeSocial}', '${dataNascimento}', '${email}', '${newSenha}', '${rua}', '${bairro}', '${numero}', '${cep}', '${complemento}', '${pontoReferencia}', '${frequencia}', '${telefone}')
    `);

    return {mensagem: "Usuario inserido com sucesso"}
}

async function searchUser(email){
    const request = new mssql.Request()

    request.input("email", mssql.VarChar(255), email)

    const query = `SELECT * FROM daroca.usuarios WHERE email = @email`
    const usuario = await request.query(query)

    return usuario.recordset[0]
}

module.exports = {postUsers, searchUser}