function buscar(event) {
  event.preventDefault();

  let texto = document.getElementById("search-bar").value;
  localStorage.setItem("nome", texto);

  window.location.href = '../compras/Compras.html';
}