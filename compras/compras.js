var listaDeProdutos = [];
var arrayDeNomes = [];
let url = (localStorage.getItem("nome") == null) ? "http://localhost:8088/produtos/" : `http://localhost:8088/produtos/${localStorage.getItem("nome")}`

fetch(url)
    .then(res => res.json())
    .then(produtos => {
        listaDeProdutos = produtos;
        criarCards(listaDeProdutos); // cria todos os cards inicialmente
    });

localStorage.removeItem("nome")

function criarCards(produtos){
    let section = document.getElementById("produtos");
    section.innerHTML = ""; // limpa antes de criar os novos cards
    arrayDeNomes = []; // zera o array também

    produtos.forEach((produto)=>{    
        // agora sim começa a criar os cards
        let card = document.createElement("div");
        card.classList.add("cards");

        let categoria = document.createElement("div");
        categoria.classList.add(`categoria-${produto.categoria}`);

        let imagem = document.createElement("img");
        imagem.src = produto.imagem;
        categoria.appendChild(imagem);

        let conteudo = document.createElement("div");
        conteudo.classList.add("conteudo");

        let info = document.createElement("div");
        info.classList.add("informacoes_do_produto");

        let nome = document.createElement("h3");
        nome.classList.add("nome_produto");
        nome.textContent = produto.nome;
        arrayDeNomes.push(produto.nome);

        let preco = document.createElement("p");
        preco.textContent = `R$ ${produto.valor.toFixed(2)} / ${produto.descricao}`;

        info.appendChild(nome);
        info.appendChild(preco);

        let botao = document.createElement("button");
        botao.classList.add("botao_adicionar");
        botao.textContent = `+`;

        conteudo.appendChild(info);
        conteudo.appendChild(botao);

        card.appendChild(categoria);
        card.appendChild(conteudo);

        section.appendChild(card);
    });
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