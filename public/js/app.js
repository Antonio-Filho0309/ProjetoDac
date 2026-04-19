// ===== CADASTRO =====
document.getElementById("classForm").addEventListener("submit", function (e) {
  e.preventDefault(); // evita recarregar a página

  // pega os valores dos inputs
  const nome = document.getElementById("nome").value;
  const login = document.getElementById("login").value;
  const senha = document.getElementById("senha").value;

  // envia pro backend
  fetch("http://localhost:3000/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: nome,
      login: login,
      senha: senha,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message); // mostra mensagem do backend
    })
    .catch((error) => {
      console.error(error);
      alert("Erro ao cadastrar");
    });
});


// ===== LOGIN =====
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const login = document.getElementById("name").value;
  const senha = document.getElementById("password").value;

  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login, senha }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        // ✅ AQUI FAZ IR PRA INDEX
        window.location.href = "index.html";
      } else {
        alert("Usuário ou senha inválidos");
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Erro no login");
    });
});