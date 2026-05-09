const express = require("express");
const router = express.Router();
const db = require("../db");

// LISTAR
router.get("/contas", (req, res) => {

    const sql = "SELECT * FROM tb_contas_pagar";

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

// CADASTRAR
router.post("/contas", (req, res) => {

    const {
        valor,
        data_vencimento,
        data_pagamento,
        tipo_titulo_id,
        atualizado_por
    } = req.body;

    const sql = `
        INSERT INTO tb_contas_pagar
        (
            valor,
            data_vencimento,
            data_pagamento,
            tipo_titulo_id,
            atualizado_por,
            atualizado_em
        )
        VALUES (?, ?, ?, ?, ?, NOW())
    `;

    db.query(
        sql,
        [
            valor,
            data_vencimento,
            data_pagamento,
            tipo_titulo_id,
            atualizado_por
        ],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            res.json(result);
        }
    );
});

// EDITAR
router.put("/contas/:id", (req, res) => {

    const { id } = req.params;

    const {
        valor,
        data_vencimento,
        data_pagamento,
        tipo_titulo_id,
        atualizado_por
    } = req.body;

    const sql = `
        UPDATE tb_contas_pagar
        SET
            valor = ?,
            data_vencimento = ?,
            data_pagamento = ?,
            tipo_titulo_id = ?,
            atualizado_por = ?,
            atualizado_em = NOW()
        WHERE conta_pagar_id = ?
    `;

    db.query(
        sql,
        [
            valor,
            data_vencimento,
            data_pagamento,
            tipo_titulo_id,
            atualizado_por,
            id
        ],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            res.json(result);
        }
    );
});

// EXCLUIR
router.delete("/contas/:id", (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM tb_contas_pagar
        WHERE conta_pagar_id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

module.exports = router;