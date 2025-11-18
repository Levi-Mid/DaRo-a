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
        botao.addEventListener("click", () => {
            mostrarModal(produto)
        })
        conteudo.appendChild(info);
        conteudo.appendChild(botao);

        card.appendChild(categoria);
        card.appendChild(conteudo);

        section.appendChild(card);
    });
}

function mostrarModal(produto) {
    const modal = document.getElementById("modal");
    const nomeEl = document.getElementById("modal-nome");
    const imagemEl = document.getElementById("modal-imagem");
    const precoEl = document.getElementById("modal-preco");
    const totalEl = document.getElementById("valor-total");
    const qtdEl = document.getElementById("quantidade");

    let quantidade = 1;

    // preenche o modal com os dados do produto
    nomeEl.textContent = produto.nome;
    imagemEl.src = produto.imagem;
    precoEl.textContent = `Preço: R$ ${produto.valor.toFixed(2)}`;
    totalEl.textContent = `Total: R$ ${(produto.valor * quantidade).toFixed(2)}`;
    qtdEl.textContent = quantidade;

    modal.classList.remove("escondido");

    // aumentar quantidade clicou no botao +
    document.getElementById("aumentar").onclick = () => {
        quantidade++;
        qtdEl.textContent = quantidade;
        totalEl.textContent = `Total: R$ ${(produto.valor * quantidade).toFixed(2)}`;
    };

    // diminuir quantidade, apertou no botão -
    document.getElementById("diminuir").onclick = () => {
        if (quantidade > 1) {
            quantidade--;
            qtdEl.textContent = quantidade;
            totalEl.textContent = `Total: R$ ${(produto.valor * quantidade).toFixed(2)}`;
        }
    };

    // fechar modal (esconde)
    document.getElementById("fechar-modal").onclick = () => {
        modal.classList.add("escondido");
    };

    // botão de adicionar ao carrinho (simples, só para testar)
    document.getElementById("adicionar-carrinho").onclick = () => {
        adicionarProdutoAPI(produto.id, quantidade); 
        modal.classList.add("escondido");
    };
}

async function adicionarProdutoAPI(idProduto, quantidade) {
    const urlAPI = "http://localhost:8088/carrinho"; 
    
    try {
        const token = localStorage.getItem("token")
        const response = await fetch(urlAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                id_produto: idProduto,
                quantidade: quantidade,
            })
        });

        const resultado = await response.json();

        if (response.ok) {
            console.log("Produto adicionado com sucesso:", resultado);
            alert(`"${resultado.mensagem}"`);
            
        } else {
            console.error("Erro ao adicionar ao carrinho:", resultado.mensagem);
            alert(`Erro: ${resultado.mensagem}`);
        }
    } catch (error) {
        console.error("Erro de rede ao adicionar ao carrinho:", error);
        alert("Erro de comunicação com o servidor.");
    }
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