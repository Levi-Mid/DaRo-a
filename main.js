const paginaCompleta = document.getElementById("paginaCompleta")
const corpo = document.getElementById("corpo")
const cabecalho = document.getElementById("cabecalho")
const rodape = document.getElementById("rodape")

fetch("./header/header.html")
    .then(resp=> {
        return resp.text()
    })
    .then(arq =>{
        cabecalho.innerHTML = arq

            let cssCabecalho = document.createElement("link")
            cssCabecalho.rel = "stylesheet"
            cssCabecalho.href = "./header/styleHeader.css"
            document.getElementById("header").appendChild(cssCabecalho)
    })

fetch("./footer/footer.html")
    .then(resp=> {
        return resp.text()
    })
    .then(arq =>{
        rodape.innerHTML = arq
        
            let cssFooter = document.createElement("link")
            cssFooter.rel = "stylesheet"
            cssFooter.href = "./footer/styleFooter.css"
            document.getElementById("footer").appendChild(cssFooter)
    })

