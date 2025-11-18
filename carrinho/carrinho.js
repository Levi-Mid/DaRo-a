const urlCarrinho = "http://localhost:8088/carrinho";
const produtosContainer = document.querySelector(".produtos");
const precoTotalElemento = document.getElementById("precoTotal");

// carregar o carrinho
async function carregarCarrinho() {
    try {
        const token = localStorage.getItem("token")

        const response = await fetch(urlCarrinho, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        const data = await response.json();

        if (response.ok) {
            exibirItensCarrinho(data.itens);
            exibirTotalCarrinho(data.total);
        }
    } catch (error) {
        console.error("Erro de rede ao carregar o carrinho:", error);
        exibirTotalCarrinho("0.00");
    }
}

//criar e exibir os cards
function exibirItensCarrinho(itens) {
    produtosContainer.innerHTML = "";

    if (itens.length === 0) {
        produtosContainer.innerHTML = `<p class="vazio">Seu carrinho está vazio. Adicione alguns produtos!</p>`;
        return;
    }

    itens.forEach(item => {
        const produtoDiv = document.createElement("div");
        produtoDiv.classList.add("produto");

        const img = document.createElement("img");
        img.src = item.imagem;
        img.alt = item.nome;
        produtoDiv.appendChild(img);

        const infoDiv = document.createElement("div");
        const nomeP = document.createElement("p");
        nomeP.textContent = item.nome;

        const precoUnitarioP = document.createElement("p");
        precoUnitarioP.textContent = `R$ ${item.valor.toFixed(2)}`;

        const quantidadeP = document.createElement("p");
        quantidadeP.textContent = `Qtd: ${item.quantidade} ${item.descricao}`;

        infoDiv.appendChild(nomeP);
        infoDiv.appendChild(precoUnitarioP);
        infoDiv.appendChild(quantidadeP);
        produtoDiv.appendChild(infoDiv);

        const subtotalP = document.createElement("p");
        subtotalP.textContent = `Subtotal: R$ ${item.subtotal.toFixed(2)}`;
        subtotalP.style.fontWeight = "bold";
        produtoDiv.appendChild(subtotalP);

        //  ADICIONANDO O BOTÃO AQUI
        const btnRemover = document.createElement("button");
        btnRemover.textContent = "Remover";
        btnRemover.classList.add("btn-remover");
        btnRemover.onclick = () => removerItem(item.id_item);
        produtoDiv.appendChild(btnRemover);

        produtosContainer.appendChild(produtoDiv);
    });
}


// Exibir o total
function exibirTotalCarrinho(total) {
    precoTotalElemento.textContent = `Total: R$ ${total}`;
}

async function removerItem(id_item) {
    if (!confirm("Deseja remover este item do carrinho?")) return;

    try {
        const token = localStorage.getItem("token")
        const response = await fetch(`http://localhost:8088/carrinho/item/${id_item}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            },
        });

        const data = await response.json();

        if (response.ok) {
            carregarCarrinho();
        } else {
            alert("Erro ao remover item");
        }
    } catch (error) {
        console.error("Erro ao remover item:", error);
        alert("Não foi possível conectar com o servidor.");
    }
}


// Carregamento inicial
carregarCarrinho();