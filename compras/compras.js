
let url = "http://localhost:8088/produtos"
const result = fetch(url)
    .then(resposta => resposta.json())
    .then(produtos =>{
        console.log("dados recebidos com sucesso")
        criarCards(produtos)
    })


function criarCards(produtos){
    produtos.forEach((produto)=>{
        //inicio dos cards
        let card = document.createElement("div");
        card.classList.add("cards");

        // "div.caixa com imagem" - mudei para categoria
        let categoria = document.createElement("div")
        categoria.classList.add(`categoria-${produto.categoria}`)

        let imagem = document.createElement("img")
        imagem.src = produto.imagem 
        categoria.appendChild(imagem)

        //div do conteudo
        let conteudo = document.createElement("div");
        conteudo.classList.add("conteudo");

        //"div informações do produto"
        let info = document.createElement("div");
        info.classList.add("informacoes_do_produto");

        let nome = document.createElement("h3");
        nome.classList.add("nome_produto");
        nome.textContent = produto.nome;

        let preco = document.createElement("p");
        preco.textContent = `R$ ${produto.valor.toFixed(2)} / ${produto.descricao}`;

        info.appendChild(nome);
        info.appendChild(preco);

        // botao
        let botao = document.createElement("button");
        botao.classList.add("botao_adicionar");
        botao.textContent = `+`;

        // montando os cards
        conteudo.appendChild(info);
        conteudo.appendChild(botao);

        card.appendChild(categoria);
        card.appendChild(conteudo);

        let section = document.getElementById("produtos");
        section.appendChild(card);

    })
}


function filtrarCategoria(categoria) {
    const cards = document.querySelectorAll(".cards");

    cards.forEach(card => {
        if (categoria == "TODOS") {
            card.style.display = "block";
        } else {
            const filhoCategoria = card.querySelector(`.categoria-${categoria}`);
            if (filhoCategoria) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        }
    });
}