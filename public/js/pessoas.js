const form = document.getElementById("classForm");
const tabela = document.getElementById("classList");

let editandoId = null;

// LISTAR PESSOAS
async function carregarPessoas() {

    const resposta = await fetch("/pessoas");

    const pessoas = await resposta.json();

    tabela.innerHTML = "";

    pessoas.forEach((pessoa) => {

        tabela.innerHTML += `
            <tr>
                <td>${pessoa.pessoa_id}</td>
                <td>${pessoa.nome}</td>
                <td>${pessoa.cpf}</td>
                <td>${pessoa.nascimento.split("T")[0]}</td>
                <td>${pessoa.telefone}</td>

                <td>

                    <button
                        class="btn btn-warning btn-sm"
                        onclick='editarPessoa(
                            ${pessoa.pessoa_id},
                            "${pessoa.nome}",
                            "${pessoa.cpf}",
                            "${pessoa.nascimento}",
                            "${pessoa.telefone}"
                        )'
                    >
                        Editar
                    </button>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="excluirPessoa(${pessoa.pessoa_id})"
                    >
                        Excluir
                    </button>

                </td>
            </tr>
        `;
    });
}

// CADASTRAR / EDITAR
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const dados = {

        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        nascimento: document.getElementById("nascimento").value,
        telefone: document.getElementById("telefone").value,

        pessoa_tipo_id: 1,
        atualizado_por: 1
    };

    // EDITAR
    if (editandoId) {

        await fetch(`/pessoas/${editandoId}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(dados)
        });

        editandoId = null;

        document.getElementById("submit").innerText = "Cadastrar";
    }

    // CADASTRAR
    else {

        await fetch("/pessoas", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(dados)
        });
    }

    form.reset();

    fecharModal("vis-modal");

    carregarPessoas();
});

// EDITAR
function editarPessoa(id, nome, cpf, nascimento, telefone) {

    editandoId = id;

    document.getElementById("nome").value = nome;

    document.getElementById("cpf").value = cpf;

    document.getElementById("nascimento").value =
        nascimento.split("T")[0];

    document.getElementById("telefone").value = telefone;

    abrirModal("vis-modal");

    document.getElementById("submit").innerText = "Atualizar";
}

// EXCLUIR
async function excluirPessoa(id) {

    await fetch(`/pessoas/${id}`, {
        method: "DELETE"
    });

    carregarPessoas();
}

carregarPessoas();