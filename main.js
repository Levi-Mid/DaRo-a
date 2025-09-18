const paginaCompleta = document.getElementById("paginaCompleta")
const corpo = document.getElementById("corpo")
const cabecalho = document.getElementById("cabecalho")
const rodape = document.getElementById("rodape")
const estilo = document.getElementById("estilo")
const funcao = document.getElementById("funcao")

fetch("header.html")
    .then(resp=> {
        return resp.text()
    })
    .then(arq =>{
        cabecalho.innerHTML = arq

            let cssCabecalho = document.createElement("link")
            cssCabecalho.rel = "stylesheet"
            cssCabecalho.href = "styleHeader.css"
            document.getElementById("inicio").appendChild(cssCabecalho)
    })

fetch("./pagina-principal/indexPrincipal.html")
    .then(resp => {
        return resp.text();
    })
    .then (arq => {
        corpo.innerHTML = arq;

            cssInicial = document.createElement("link")
            cssInicial.rel = "stylesheet"
            cssInicial.href = "./pagina-principal/stylePrincipal.css"
            document.getElementById("inicio").appendChild(cssInicial)
    })

fetch("footer.html")
    .then(resp=> {
        return resp.text()
    })
    .then(arq =>{
        rodape.innerHTML = arq
    })

function carregarPagina(pagina){
    fetch(pagina)
        .then(resp => resp.text())
        .then(arq => {
            corpo.innerHTML = arq

            if (pagina == "./compras/compras_body.html") {
                estilo.href = "./compras/compras.css"
                funcao.src = "./compras/compras.js"
                paginaCompleta.appendChild(funcao)
            }

            if (pagina == "./cadastro/cadastro.html") {
                paginaCompleta.innerHTML = arq
                estilo.href = "./cadastro/stylecadastro.css"
                funcao.src = "./cadastro/cadastro.js"
                paginaCompleta.appendChild(funcao)
            }

            if (pagina == "./pagina-principal/indexPrincipal.html") {
                estilo.href = "./pagina-principal/stylePrincipal.css"
                funcao.removeAttribute("src")
                funcao.src = "./pagina-principal/script.js"
            }
        })

}
