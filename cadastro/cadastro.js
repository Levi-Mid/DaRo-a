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
    senha: ""
}

let ids = ["tel", "email", "rua", "bairro", "numero", "cep", "complemento", "pontoRef", "senha"]
let placeholders = ["Telefone *", "Email *", "Rua *", "Bairro *", "Numero *", "CEP *", "Complemento *", "Ponto de referencia *", "Senha *"]

function outraEtapa(){
    let geral = "";
    for (let i = 0; i < 9; i++){
        div = `<div class="inputs"><input type="text" placeholder="${placeholders[i]}" id="${ids[i]}"></div>`
        geral += div
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

function enviar(){
    let tel = document.getElementById("tel").value;
    let email = document.getElementById("email").value;
    let rua = document.getElementById("rua").value;
    let bairro = document.getElementById("bairro").value;
    let numero = document.getElementById("numero").value;
    let cep = document.getElementById("cep").value;
    let complemento = document.getElementById("complemento").value;
    let pontoRef = document.getElementById("pontoRef").value;
    let senha = document.getElementById("senha").value;

    if (tel == "" || email == "" || rua == "" || bairro == "" || numero == "" || cep == "" || complemento == "" || pontoRef == "" || senha == ""){
        alert("Preencha todos os campos que contenham *")
    }
    else{
        infos.tel = tel
        infos.email = email
        infos.endereco.rua = rua
        infos.endereco.bairro = bairro
        infos.endereco.numero = numero
        infos.endereco.cep = cep
        infos.endereco.complemento = complemento
        infos.endereco.pontoRef = pontoRef
        infos.senha = senha
        console.log(infos)
    }
}