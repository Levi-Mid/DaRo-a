function mostrarComentarios(url){
    fetch(url)
        .then(url => url.json())
        .then(pull => {
            for (let i = 0; i < pull.length; i++){
                let comentario = document.createElement("div")
                comentario.classList("comment")

                let info = document.createElement("div")
                info.classList("infos")

                let nome = document.createElement("p")
                nome.textContent = pull[i].nome

                let idade = document.createElement("p")
                idade.textContent = pull[i].idade

                let dia = document.createElement("p")
                dia.textContent = pull[i].data

                info.append(nome, idade, dia)

                let texto = document.createElement("p")
                texto.classList("texto")
                texto.textContent = pull[i].texto

                if (i % 2 == 0){
                    info.style.backgroundColor = "BFDCCD"
                    texto.style.backgroundColor = "BFDCCD"
                    texto.style.borderLeftColor = "3A5D41"
                }
                else{
                    info.style.backgroundColor = "F5C296"
                    texto.style.backgroundColor = "F5C296"
                    texto.style.borderLeftColor = "EB8832"
                }
            }
        })
}

mostrarComentarios("http://localhost/8088")

let formAberto = false
function postar(){
    if (!formAberto){
        let div = document.getElementById("formulario")

        let infos = document.createElement("div")
        infos.id = "userInfo"
        let nome = document.createElement("input")
        nome.placeholder = "Nome"
        nome.className = "league-gothic"
        let idade = document.createElement("input")
        idade.placeholder = "Idade"
        idade.className = "league-gothic"

        infos.append(nome, idade)

        let texto = document.createElement("textarea")
        texto.id = "texto"
        texto.placeholder = "Escreva aqui sua mensagem"
        texto.rows = 3
        texto.className = "league-gothic"

        div.appendChild(infos)
        div.appendChild(texto)

        formAberto = true
    }
}