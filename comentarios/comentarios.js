const url = "http://localhost:8088/comentarios"

function mostrarComentarios(url){
    fetch(url)
        .then(dados => dados.json())
        .then(pull => {
            for (let i = 0; i < pull.length; i++){
                let comentarios = document.getElementById("comentarios")

                let comentario = document.createElement("div")
                comentario.classList.add("comment")

                let info = document.createElement("div")
                info.classList.add("infos")

                let nome = document.createElement("p")
                nome.textContent = "Nome: " + pull[i].nome

                let dia = document.createElement("p")
                dia.textContent = "Data: " + pull[i].data_criacao

                info.append(nome, dia)

                let texto = document.createElement("p")
                texto.classList.add("texto")
                texto.textContent = pull[i].texto

                comentario.append(info, texto)
                comentarios.appendChild(comentario)

                if (i % 2 == 0){
                    info.style.backgroundColor = "#BFDCCD"
                    texto.style.backgroundColor = "#BFDCCD"
                    texto.style.borderLeftColor = "#3A5D41"
                }
                else{
                    info.style.backgroundColor = "#F5C296"
                    texto.style.backgroundColor = "#F5C296"
                    texto.style.borderLeftColor = "#EB8832"
                }
            }
        })
}

mostrarComentarios(url)

async function enviar(url, event){
    event.preventDefault()

    let nome = document.getElementById("nome").value
    let texto = document.getElementById("texto").value
    let token = localStorage.getItem("token")

    if (nome == "" || texto == ""){
        return alert("Você precisa preencher todos os campos")
    }

    let dados = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            nome: nome,
            texto: texto
        })
    }
    await fetch(url, dados)
    window.location.reload()
}

let formAberto = false
async function abrirForm(){
    if (!formAberto && localStorage.getItem("token")){
        let div = document.getElementById("formulario")

        let infos = document.createElement("div")
        infos.id = "userInfo"
        let nome = document.createElement("input")
        nome.id = "nome"
        const token = localStorage.getItem("token")

        const pegarNome = await fetch("http://localhost:8088/usuarios/", {
            headers: {
                "Authorization": "Bearer " + token
            }
        })

        const data = await pegarNome.json()
        let nomeCerto = data.nome.split(" ")

        nome.value = nomeCerto[0]
        nome.className = "league-gothic"
        nome.readOnly = true
        
        let botao = document.createElement("button")
        botao.id = "botao_enviar"
        botao.textContent = "Enviar"
        botao.classList.add("league-gothic")
        botao.type = "submit"

        infos.append(nome)

        let texto = document.createElement("textarea")
        texto.id = "texto"
        texto.placeholder = "Escreva aqui sua mensagem"
        texto.rows = 3
        texto.className = "league-gothic"

        div.appendChild(infos)
        div.appendChild(texto)
        div.appendChild(botao)

        formAberto = true
    }
    else{
        if (!localStorage.getItem("token")) alert("Você precisa estar logado")
    }
}