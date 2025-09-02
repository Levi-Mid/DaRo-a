const produtos = [
    // Frutas
    {
        nome: "Maçã",
        imagem: "./imagens/alimentos/maça.png",
        preco: 5.50,
        quantidade: "kg",
        categoria: "fruta"
    },
    {
        nome: "Banana",
        imagem: "./imagens/alimentos/banana.png",
        preco: 4.20,
        quantidade: "kg",
        categoria: "fruta"
    },
    {
        nome: "Laranja",
        imagem: "./imagens/alimentos/laranja.png",
        preco: 3.80,
        quantidade: "kg",
        categoria: "fruta"
    },
    {
        nome: "Uva",
        imagem: "./imagens/alimentos/uva.png",
        preco: 9.90,
        quantidade: "kg",
        categoria: "fruta"
    },
    {
        nome: "Manga",
        imagem: "./imagens/alimentos/manga.png",
        preco: 6.00,
        quantidade: "kg",
        categoria: "fruta"
    },

    // Legumes
    {
        nome: "Cenoura",
        imagem: "./imagens/alimentos/cenoura.png",
        preco: 3.50,
        quantidade: "kg",
        categoria: "legume"
    },
    {
        nome: "Batata",
        imagem: "./imagens/alimentos/batata.png",
        preco: 4.00,
        quantidade: "kg",
        categoria: "legume"
    },
    {
        nome: "Tomate",
        imagem: "./imagens/alimentos/tomate.png",
        preco: 6.50,
        quantidade: "kg",
        categoria: "legume"
    },
    {
        nome: "Abobrinha",
        imagem: "./imagens/alimentos/abobrinha.png",
        preco: 5.20,
        quantidade: "kg",
        categoria: "legume"
    },
    {
        nome: "Berinjela",
        imagem: "./imagens/alimentos/berinjela.png",
        preco: 7.10,
        quantidade: "kg",
        categoria: "legume"
    },

    // Verduras
    {
        nome: "Alface",
        imagem: "./imagens/alimentos/alface.png",
        preco: 2.50,
        quantidade: "unid",
        categoria: "verdura"
    },
    {
        nome: "Couve",
        imagem: "./imagens/alimentos/couve.png",
        preco: 3.00,
        quantidade: "unid",
        categoria: "verdura"
    },
    {
        nome: "Rúcula",
        imagem: "./imagens/alimentos/rucula.png",
        preco: 3.20,
        quantidade: "pct",
        categoria: "verdura"
    },
    {
        nome: "Espinafre",
        imagem: "./imagens/alimentos/espinafre.png",
        preco: 4.50,
        quantidade: "pct",
        categoria: "verdura"
    },
    {
        nome: "Agrião",
        imagem: "./imagens/alimentos/agrião.png",
        preco: 3.80,
        quantidade: "pct",
        categoria: "verdura"
    }
];

function criarCards(produtos){
    produtos.forEach((produto)=>{
        //inicio dos cards
        let card = document.createElement("div");
        card.classList.add("cards");

        // "div.caixa com imagem" - mudei para categoria
        let categoria = document.createElement("div")
        categoria.classList.add(`${produto.categoria}`)

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
        preco.textContent = `R$ ${produto.preco} / ${produto.quantidade}`;

        info.appendChild(nome);
        info.appendChild(preco);

        // botao
        let botao = document.createElement("button");
        botao.classList.add("botao_adicionar");
        botao.textContent = `+`;

        // montando igual estava no html
        conteudo.appendChild(info);
        conteudo.appendChild(botao);

        card.appendChild(categoria);
        card.appendChild(conteudo);

        let section = document.getElementById("produtos");
        section.appendChild(card);

    })
}

criarCards(produtos);