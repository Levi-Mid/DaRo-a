const searchBar = document.getElementById("search-bar");
const lupa = document.getElementById("lupa");

lupa.addEventListener("click", buscarProduto);
searchBar.addEventListener("keyup", (event) => {
    if (event.key === "Enter") buscarProduto(); // busca ao pressionar Enter
});

function buscarProduto() {
    const termo = searchBar.value.trim().toLowerCase(); // pega o que foi digitado
    const evento = new CustomEvent("buscarProduto", { detail: termo }); // cria evento
    window.dispatchEvent(evento); // envia evento globalmente
}
