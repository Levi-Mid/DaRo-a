const produtos = [
    // Frutas (categoria = 1)
    { id: 1, nome: "Maçã", imagem: "./compras/imagens/alimentos/maça.png", valor: 5.50, descricao: "kg", categoria: 1 },
    { id: 2, nome: "Banana", imagem: "./compras/imagens/alimentos/banana.png", valor: 4.20, descricao: "kg", categoria: 1 },
    { id: 3, nome: "Laranja", imagem: "./compras/imagens/alimentos/laranja.png", valor: 3.80, descricao: "kg", categoria: 1 },
    { id: 4, nome: "Uva", imagem: "./compras/imagens/alimentos/uva.png", valor: 9.90, descricao: "kg", categoria: 1 },
    { id: 5, nome: "Manga", imagem: "./compras/imagens/alimentos/manga.png", valor: 6.00, descricao: "kg", categoria: 1 },

    // Legumes (categoria = 2)
    { id: 6, nome: "Cenoura", imagem: "./compras/imagens/alimentos/cenoura.png", valor: 3.50, descricao: "kg", categoria: 2 },
    { id: 7, nome: "Batata", imagem: "./compras/imagens/alimentos/batata.png", valor: 4.00, descricao: "kg", categoria: 2 },
    { id: 8, nome: "Tomate", imagem: "./compras/imagens/alimentos/tomate.png", valor: 6.50, descricao: "kg", categoria: 2 },
    { id: 9, nome: "Abobrinha", imagem: "./compras/imagens/alimentos/abobrinha.png", valor: 5.20, descricao: "kg", categoria: 2 },
    { id: 10, nome: "Berinjela", imagem: "./compras/imagens/alimentos/berinjela.png", valor: 7.10, descricao: "kg", categoria: 2 },

    // Verduras (categoria = 3)
    { id: 11, nome: "Alface", imagem: "./compras/imagens/alimentos/alface.png", valor: 2.50, descricao: "unid", categoria: 3 },
    { id: 12, nome: "Couve", imagem: "./compras/imagens/alimentos/couve.png", valor: 3.00, descricao: "unid", categoria: 3 },
    { id: 13, nome: "Rúcula", imagem: "./compras/imagens/alimentos/rucula.png", valor: 3.20, descricao: "pct", categoria: 3 },
    { id: 14, nome: "Espinafre", imagem: "./compras/imagens/alimentos/espinafre.png", valor: 4.50, descricao: "pct", categoria: 3 },
    { id: 15, nome: "Agrião", imagem: "./compras/imagens/alimentos/agrião.png", valor: 3.80, descricao: "pct", categoria: 3 }
];


async function carregarProdutos() {
    try {
        const resposta = await fetch("http://localhost:8081/produtos")
        const produtos = await resposta.json()

        criarCards(produtos)
    }
    catch (erro){
        console.error("errp ap buscar produtos", erro)
    }
}

carregarProdutos()

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

criarCards(produtos);

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