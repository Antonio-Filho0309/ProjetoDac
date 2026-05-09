const express = require("express");
const router = express.Router();
const db = require("../db");

// LISTAR
router.get("/pessoas", (req, res) => {

    const sql = "SELECT * FROM tb_pessoas";

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

// INSERIR
router.post("/pessoas", (req, res) => {

    const {
        nome,
        cpf,
        nascimento,
        telefone,
        pessoa_tipo_id,
        atualizado_por
    } = req.body;

    const sql = `
        INSERT INTO tb_pessoas
        (nome, cpf, nascimento, telefone, pessoa_tipo_id, atualizado_por, atualizado_em)
        VALUES (?, ?, ?, ?, ?, ?, NOW())
    `;

    db.query(
        sql,
        [
            nome,
            cpf,
            nascimento,
            telefone,
            pessoa_tipo_id,
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
router.put("/pessoas/:id", (req, res) => {

    const { id } = req.params;

    const {
        nome,
        cpf,
        nascimento,
        telefone,
        pessoa_tipo_id,
        atualizado_por
    } = req.body;

    const sql = `
        UPDATE tb_pessoas
        SET
            nome = ?,
            cpf = ?,
            nascimento = ?,
            telefone = ?,
            pessoa_tipo_id = ?,
            atualizado_por = ?,
            atualizado_em = NOW()
        WHERE pessoa_id = ?
    `;

    db.query(
        sql,
        [
            nome,
            cpf,
            nascimento,
            telefone,
            pessoa_tipo_id,
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
router.delete("/pessoas/:id", (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM tb_pessoas WHERE pessoa_id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

module.exports = router;