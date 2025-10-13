const { mssql } = require("../config/db")

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

    await mssql.query(`
      INSERT INTO daroca.usuarios 
      (cpf, nome_completo, apelido_nome_social, data_nascimento, email, senha, rua, bairro, numero, cep, complemento, ponto_referencia, frequencia, telefone_contato)
      VALUES ('${cpf}', '${nomeCompleto}', '${nomeSocial}', '${dataNascimento}', '${email}', '${senha}', '${rua}', '${bairro}', '${numero}', '${cep}', '${complemento}', '${pontoReferencia}', '${frequencia}', '${telefone}')
    `);

    return {mensagem: "Usuario inserido com sucesso"}
}

module.exports = {postUsers}