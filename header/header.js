function buscar(event) {
  event.preventDefault();

  let texto = document.getElementById("search-bar").value;
  localStorage.setItem("nome", texto);

  window.location.href = '../compras/Compras.html';
}

document.addEventListener("DOMContentLoaded", verificarToken)

async function verificarToken() {
  const token = localStorage.getItem("token")
  if (token) {
    try {
      const response = await fetch("http://localhost:8088/usuarios/", {
        headers: {
          "Authorization": "Bearer " + token
        }
      })

      const data = await response.json()

      let funciona = data.nome
      let nomeCerto = funciona.split(" ")

      // 
      document.getElementById("aquelaParteLa").innerHTML = `
    <div class="user-wrapper">
        <h3 id="msgdeboasvindas" style="cursor:pointer;">Bem-vindo, ${nomeCerto[0]}</h3>

        <div class="user-dropdown">
            <a href="../usuario/usuario.html" class="dropdown-item">Perfil do Usuário</a>
            <a href="#" onclick="logout()" class="dropdown-item">Logout</a>
        </div>
    </div>
    `;

      // AGORA O MENU FICA DENTRO DE `aquelaParteLa`

    }
    catch (err) {
      console.error("Erro ao buscar usuário:", err)
    }

    // corrigir o link do carrinho
    let carrinho = document.getElementById("linkCarrinho")
    carrinho.href = "../carrinho/carrinho.html"
  }
}


async function login(event) {
  event.preventDefault()

  let email = document.getElementById("email").value
  let senha = document.getElementById("senha").value

  let options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      senha: senha
    })
  }

  try {
    const response = await fetch("http://localhost:8088/usuarios/login", options)
    const token = await response.json()

    if (response.ok && token.token) {
      localStorage.setItem("token", token.token)
      window.location.reload()
    }
    else {
      alert("Credenciais incorretas")
    }

  }
  catch (error) {
    alert(error)
  }
}

function logout() {
  localStorage.removeItem("token");
  alert("Conta desconectada")
  window.location.reload()
  
}

document.addEventListener("click", function(e) {
    const wrapper = document.querySelector(".user-wrapper");
    const dropdown = document.querySelector(".user-dropdown");

    if (!wrapper) return;

    // clicou no Bem-vindo
    if (e.target.id === "msgdeboasvindas") {
        wrapper.classList.toggle("ativo");
        return;
    }

    // clicou fora → fecha
    if (!wrapper.contains(e.target)) {
        wrapper.classList.remove("ativo");
    }
});
