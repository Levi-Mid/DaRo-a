let infos = {
    cpf : "",
    nome: "",
    nomeSocial: "",
    nascimento: "",
    tel: "",
    email: "",
    endereco: {
        rua: "",
        bairro: "",
        numero: "",
        cep: "",
        complemento: "",
        pontoRef: ""
    },
    frequencia: "",
    senha: ""
}

const ids = ["tel", "email", "rua", "bairro", "numero", "cep", "complemento", "pontoRef", "frequencia", "senha"]
const placeholders = ["Telefone *", "Email *", "Rua *", "Bairro *", "Numero *", "CEP *", "Complemento *", "Ponto de referencia *", "Frequencia*", "Senha *"]

function outraEtapa(){
    let geral = "";
    for (let i = 0; i < ids.length; i++){
      if (i == 8){
        let select = `<select id="frequencia"><option value="7">Semanal</option><option value="15">Quinzenal</option><option value="30">Mensal</option></select>`
        geral += select
      }
      else{
        let div = `<div class="inputs"><input type="text" placeholder="${placeholders[i]}" id="${ids[i]}"></div>`
        geral += div
      }
    }
    return geral
}

function proximo(){
    let cpf = document.getElementById("cpf").value;
    let nome = document.getElementById("nome").value;
    let nomeSocial = document.getElementById("nomeSocial").value;
    let nascimento = document.getElementById("nascimento").value;

    if (cpf == "" || nome == "" || nascimento == ""){
        alert("Preencha todos os campos que contenham *")
    }
    else{
        infos.cpf = cpf;
        infos.nome = nome;
        infos.nomeSocial = nomeSocial;
        infos.nascimento = nascimento;
        console.log(infos)
        document.getElementById("inputs").innerHTML = outraEtapa();
        document.getElementById("enviar").innerHTML = "Enviar";
        document.getElementById("enviar").onclick = enviar;
    }
}

async function enviar() {
  let tel = document.getElementById("tel").value;
  let email = document.getElementById("email").value;
  let rua = document.getElementById("rua").value;
  let bairro = document.getElementById("bairro").value;
  let numero = document.getElementById("numero").value;
  let cep = document.getElementById("cep").value;
  let complemento = document.getElementById("complemento").value;
  let pontoRef = document.getElementById("pontoRef").value;
  let frequencia = document.getElementById("frequencia").value;
  let senha = document.getElementById("senha").value;

  if (tel == "" || email == "" || rua == "" || bairro == "" || numero == "" || cep == "" || complemento == "" || pontoRef == "" || senha == "") {
    alert("Preencha todos os campos que contenham *");
    return;
  }

  infos.tel = tel;
  infos.email = email;
  infos.endereco.rua = rua;
  infos.endereco.bairro = bairro;
  infos.endereco.numero = numero;
  infos.endereco.cep = cep;
  infos.endereco.complemento = complemento;
  infos.endereco.pontoRef = pontoRef;
  infos.frequencia = frequencia;
  infos.senha = senha;

  const url = "http://localhost:8088/usuarios";
  const dados = {
    cpf: infos.cpf,
    nomeCompleto: infos.nome,
    nomeSocial: infos.nomeSocial,
    dataNascimento: infos.nascimento,
    email: infos.email,
    senha: infos.senha,
    rua: infos.endereco.rua,
    bairro: infos.endereco.bairro,
    numero: infos.endereco.numero,
    cep: infos.endereco.cep,
    complemento: infos.endereco.complemento,
    pontoReferencia: infos.endereco.pontoRef,
    frequencia: infos.frequencia,
    telefone: infos.tel
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });

    if (response.ok) {
      alert("Usuário cadastrado com sucesso!");
    } else {
      alert("Erro ao cadastrar usuário!");
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
}
