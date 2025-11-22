document.addEventListener("DOMContentLoaded", carregarInfo)

const usuario = {
    nome_completo: "",
    apelido_nome_social: "",
    email: "",
    senha: "",
    cep: "",
    bairro: "",
    rua: "",
    numero: "",
    complemento: "",
    ponto_referencia: "",
    telefone_contato: ""
}

function limparSecao(){
    document.getElementById("infos").innerHTML = ""
}

async function carregarInfo(){
    limparSecao()
    const token = localStorage.getItem("token")

    const infos = await fetch("http://localhost:8088/usuarios/usuario", {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    const data = await infos.json()

    const informacoes = ["nome_completo", "apelido_nome_social", "email", "senha", "cep", "bairro", "rua", "numero", "complemento", "ponto_referencia", "telefone_contato"]
    const placeholders = ["Nome completo", "Nome social", "Email", "Senha", "CEP", "Bairro", "Rua", "Numero", "Complemento", "Ponto de Referencia", "Telefone"]

    let form = document.createElement("form")
    form.onsubmit = (event) => {
        event.preventDefault()
        alterar(usuario)
    }
    form.id = "form"

    document.getElementById("infos").appendChild(form)

    for (let i = 0; i < 11; i++){
        let div = document.getElementById("form")

        let teste

        if (informacoes[i] != "senha"){
            teste = `<div class="caixa"><label>${placeholders[i] + ":"}</label><input id="${informacoes[i]}" placeholder="${data[informacoes[i]]}"></div>`
        }
        else{
            teste = `<div class="caixa"><label>${placeholders[i] + ":"}</label><input id=${informacoes[i]}></div>`
        }

        div.innerHTML += teste
    }

    let button = document.createElement("button")
    button.id = "enviar"
    button.textContent = "Alterar"

    document.getElementById("form").appendChild(button)
}

async function carregarPedidos() {
    limparSecao()
}

async function alterar(infos) {
    const token = localStorage.getItem("token")

    const bicicleta = await fetch("http://localhost:8088/usuarios/usuario", {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    const data = await bicicleta.json()

    const informacoes = ["nome_completo", "apelido_nome_social", "email", "senha", "cep", "bairro", "rua", "numero", "complemento", "ponto_referencia", "telefone_contato"]

    for (let i = 0; i < 11; i++){
        if (document.getElementById(informacoes[i]).value != ""){
            infos[informacoes[i]] = document.getElementById(informacoes[i]).value
        }
        else{
            infos[informacoes[i]] = await data[informacoes[i]]
        }
    }

    const alterar = await fetch("http://localhost:8088/usuarios/", {
        method: "PATCH",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeCompleto: infos.nome_completo,
            nomeSocial: infos.apelido_nome_social,
            email: infos.email,
            senha: infos.senha,
            cep: infos.cep,
            bairro: infos.bairro,
            rua: infos.rua,
            numero: infos.numero,
            complemento: infos.complemento,
            pontoReferencia: infos.ponto_referencia,
            telefone: infos.telefone_contato
        })
    })
    
    if (alterar.ok){
        let resultado = await alterar.json()
        alert(resultado.resultado.msg + ", você tera que se logar novamente ao voltar ao site")
        localStorage.removeItem("token")
        window.location.href = "../indexPrincipal.html"
    }
    else{
        console.log(await alterar.json())
    }
}