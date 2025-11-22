document.addEventListener("DOMContentLoaded", carregarInfo)

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

    console.log(data)

    const informacoes = ["nome_completo", "apelido_nome_social", "email", "senha", "cep", "bairro", "rua", "numero", "complemento", "ponto_referencia", "telefone_contato"]
    const placeholders = ["Nome completo", "Nome social", "Email", "Senha", "CEP", "Bairro", "Rua", "Numero", "Complemento", "Ponto de Referencia", "Telefone"]

    let form = document.createElement("form")
    form.onsubmit = () => {
        alterar(infos)
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