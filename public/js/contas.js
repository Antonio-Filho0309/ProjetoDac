const form = document.getElementById("classForm");
const tabela = document.getElementById("classList");

let editandoId = null;

// LISTAR CONTAS
async function carregarContas() {

    const resposta = await fetch("/contas");

    const contas = await resposta.json();

    tabela.innerHTML = "";

    contas.forEach((conta) => {

        tabela.innerHTML += `
            <tr>

                <td>${conta.conta_pagar_id}</td>

                <td>
                    R$ ${parseFloat(conta.valor).toFixed(2)}
                </td>

                <td>
                    ${conta.data_vencimento.split("T")[0]}
                </td>

                <td>
                    ${conta.data_pagamento
                        ? conta.data_pagamento.split("T")[0]
                        : "-"
                    }
                </td>

                <td>

                    <button
                        class="btn btn-warning btn-sm"
                        onclick="editarConta(
                            ${conta.conta_pagar_id},
                            '${conta.valor}',
                            '${conta.data_vencimento}',
                            '${conta.data_pagamento || ""}'
                        )"
                    >
                        Editar
                    </button>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="excluirConta(${conta.conta_pagar_id})"
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

        valor: document.getElementById("valor").value,

        data_vencimento:
            document.getElementById("data_vencimento").value,

        data_pagamento:
            document.getElementById("data_pagamento").value,

        tipo_titulo_id: 1,
        atualizado_por: 1
    };

    // EDITAR
    if (editandoId) {

        await fetch(`/contas/${editandoId}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(dados)
        });

        editandoId = null;

        document.getElementById("submit").innerText =
            "Cadastrar";
    }

    // CADASTRAR
    else {

        await fetch("/contas", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(dados)
        });
    }

    form.reset();

    fecharModal("vis-modal");

    carregarContas();
});

// EDITAR
function editarConta(
    id,
    valor,
    data_vencimento,
    data_pagamento
) {

    editandoId = id;

    document.getElementById("valor").value = valor;

    document.getElementById("data_vencimento").value =
        data_vencimento.split("T")[0];

    if (data_pagamento) {

        document.getElementById("data_pagamento").value =
            data_pagamento.split("T")[0];
    }

    abrirModal("vis-modal");

    document.getElementById("submit").innerText =
        "Atualizar";
}

// EXCLUIR
async function excluirConta(id) {

    await fetch(`/contas/${id}`, {
        method: "DELETE"
    });

    carregarContas();
}

carregarContas();