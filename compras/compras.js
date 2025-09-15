const produtos = [
    // Frutas
    {
        nome: "Maçã",
        imagem: "./compras/imagens/alimentos/maça.png",
        preco: 5.50,
        quantidade: "kg",
        categoria: "fruta"
    },
    {
        nome: "Banana",
        imagem: "./compras/imagens/alimentos/banana.png",
        preco: 4.20,
        quantidade: "kg",
        categoria: "fruta"
    },
    {
        nome: "Laranja",
        imagem: "./compras/imagens/alimentos/laranja.png",
        preco: 3.80,
        quantidade: "kg",
        categoria: "fruta"
    },
    {
        nome: "Uva",
        imagem: "./compras/imagens/alimentos/uva.png",
        preco: 9.90,
        quantidade: "kg",
        categoria: "fruta"
    },
    {
        nome: "Manga",
        imagem: "./compras/imagens/alimentos/manga.png",
        preco: 6.00,
        quantidade: "kg",
        categoria: "fruta"
    },

    // Legumes
    {
        nome: "Cenoura",
        imagem: "./compras/imagens/alimentos/cenoura.png",
        preco: 3.50,
        quantidade: "kg",
        categoria: "legume"
    },
    {
        nome: "Batata",
        imagem: "./compras/imagens/alimentos/batata.png",
        preco: 4.00,
        quantidade: "kg",
        categoria: "legume"
    },
    {
        nome: "Tomate",
        imagem: "./compras/imagens/alimentos/tomate.png",
        preco: 6.50,
        quantidade: "kg",
        categoria: "legume"
    },
    {
        nome: "Abobrinha",
        imagem: "./compras/imagens/alimentos/abobrinha.png",
        preco: 5.20,
        quantidade: "kg",
        categoria: "legume"
    },
    {
        nome: "Berinjela",
        imagem: "./compras/imagens/alimentos/berinjela.png",
        preco: 7.10,
        quantidade: "kg",
        categoria: "legume"
    },

    // Verduras
    {
        nome: "Alface",
        imagem: "./compras/imagens/alimentos/alface.png",
        preco: 2.50,
        quantidade: "unid",
        categoria: "verdura"
    },
    {
        nome: "Couve",
        imagem: "./compras/imagens/alimentos/couve.png",
        preco: 3.00,
        quantidade: "unid",
        categoria: "verdura"
    },
    {
        nome: "Rúcula",
        imagem: "./compras/imagens/alimentos/rucula.png",
        preco: 3.20,
        quantidade: "pct",
        categoria: "verdura"
    },
    {
        nome: "Espinafre",
        imagem: "./compras/imagens/alimentos/espinafre.png",
        preco: 4.50,
        quantidade: "pct",
        categoria: "verdura"
    },
    {
        nome: "Agrião",
        imagem: "./compras/imagens/alimentos/agrião.png",
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