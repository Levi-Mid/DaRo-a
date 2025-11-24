document.addEventListener("DOMContentLoaded", carregarInfo)

const usuario = {
    nome_completo: "",
    apelido_nome_social: "",
    email: "",
    senha: "",
    cep: "",
    bairro: "",
    rua: "",
    numero: "",
    complemento: "",
    ponto_referencia: "",
    telefone_contato: ""
}

function limparSecao(){
    document.getElementById("infos").innerHTML = ""
}

async function carregarInfo(){
    limparSecao()
    const token = localStorage.getItem("token")

    const infos = await fetch("http://localhost:8088/usuarios/usuario", {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    const data = await infos.json()

    const informacoes = ["nome_completo", "apelido_nome_social", "email", "senha", "cep", "bairro", "rua", "numero", "complemento", "ponto_referencia", "telefone_contato"]
    const placeholders = ["Nome completo", "Nome social", "Email", "Senha", "CEP", "Bairro", "Rua", "Numero", "Complemento", "Ponto de Referencia", "Telefone"]

    let form = document.createElement("form")
    form.onsubmit = (event) => {
        event.preventDefault()
        alterar(usuario)
    }
    form.id = "form"

    document.getElementById("infos").appendChild(form)

    for (let i = 0; i < 11; i++){
        let div = document.getElementById("form")

        let teste

        if (informacoes[i] != "senha"){
            teste = `<div class="caixa"><label>${placeholders[i] + ":"}</label><input id="${informacoes[i]}" placeholder="${data[informacoes[i]]}"></div>`
        }
        else{
            teste = `<div class="caixa"><label>${placeholders[i] + ":"}</label><input id=${informacoes[i]}></div>`
        }

        div.innerHTML += teste
    }

    let button = document.createElement("button")
    button.id = "enviar"
    button.textContent = "Alterar"

    document.getElementById("form").appendChild(button)
}

async function carregarPedidos() {
    limparSecao()
    try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:8088/pedidos", {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const data = await response.json();
        const container = document.getElementById("infos");

        if (!data.pedidos || data.pedidos.length === 0) {
            container.innerHTML = "<p>Nenhum pedido encontrado.</p>";
            return;
        }

        data.pedidos.forEach(pedido => {
            // transforma string -> array
            const produtos = JSON.parse(pedido.produtos);

            const div = document.createElement("div");
            div.className = "pedido";

            div.innerHTML = `
                        <h2>Pedido</h2>
                        <p><strong>Frequência:</strong>Cada ${pedido.frequencia.trim()} dias</p>
                        <h3>Produtos:</h3>
                    `;

            produtos.forEach(prod => {
                div.innerHTML += `
                            <div class="produto">
                                <strong>${prod.nome}</strong><br>
                                Quantidade: ${prod.quantidade}<br>
                                Valor: R$ ${Math.floor((prod.valor * prod.quantidade) * 100) / 100}
                            </div>
                        `;
            });

            div.innerHTML += `<button onclick="cancelarPedido(${pedido.id_pedido})">Cancelar</button>`

            container.appendChild(div);
        });

    } catch (erro) {
        console.error("Erro ao carregar pedidos:", erro);
    }
}

async function alterar(infos) {
    const token = localStorage.getItem("token")

    const bicicleta = await fetch("http://localhost:8088/usuarios/usuario", {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    const data = await bicicleta.json()

    const informacoes = ["nome_completo", "apelido_nome_social", "email", "senha", "cep", "bairro", "rua", "numero", "complemento", "ponto_referencia", "telefone_contato"]

    for (let i = 0; i < 11; i++){
        if (document.getElementById(informacoes[i]).value != ""){
            infos[informacoes[i]] = document.getElementById(informacoes[i]).value
        }
        else{
            infos[informacoes[i]] = await data[informacoes[i]]
        }
    }

    const alterar = await fetch("http://localhost:8088/usuarios/", {
        method: "PATCH",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeCompleto: infos.nome_completo,
            nomeSocial: infos.apelido_nome_social,
            email: infos.email,
            senha: infos.senha,
            cep: infos.cep,
            bairro: infos.bairro,
            rua: infos.rua,
            numero: infos.numero,
            complemento: infos.complemento,
            pontoReferencia: infos.ponto_referencia,
            telefone: infos.telefone_contato
        })
    })
    
    if (alterar.ok){
        let resultado = await alterar.json()
        alert(resultado.resultado.msg + ", você tera que se logar novamente ao voltar ao site")
        localStorage.removeItem("token")
        window.location.href = "../indexPrincipal.html"
    }
    else{
        console.log(await alterar.json())
    }
}

async function cancelarPedido(id) {
    try {
        const token = localStorage.getItem("token")

        const response = await fetch("http://localhost:8088/pedidos/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({ id: id })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.erro || "Erro ao cancelar pedido");
            return;
        }

        alert(data.msg);
        window.location.reload()
    } catch (erro) {
        console.error("Erro interno do servidor:", erro);
    }
}