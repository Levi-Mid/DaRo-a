function buscar(event) {
  event.preventDefault();

  let texto = document.getElementById("search-bar").value;
  localStorage.setItem("nome", texto);

  window.location.href = '../compras/Compras.html';
}

document.addEventListener("DOMContentLoaded", verificarToken)

async function verificarToken(){
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

      document.getElementById("aquelaParteLa").innerHTML =
        `<h3 id="msgdeboasvindas">Bem-vindo, ${nomeCerto[0]}</h3>`
    }
    catch(err) {
      console.error("Erro ao buscar usuário:", err)
    }
  }
}

async function login(event){
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

  try{
    const response = await fetch("http://localhost:8088/usuarios/login", options)
    const token = await response.json()
    
    if (response.ok && token.token){
      localStorage.setItem("token", token.token)
      window.location.reload()
    }
    else{
      alert("Credenciais incorretas")
    }

  }
  catch(error){
    alert(error)
  }
}