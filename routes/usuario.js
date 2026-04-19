const express = require("express");
const router = express.Router();
const db = require("../db");

// CREATE
router.post("/usuarios", (req, res) => {
  const { nome, login, senha } = req.body;

  db.query(
    "INSERT INTO tb_usuarios (nome, login, senha) VALUES (?, ?, ?)",
    [nome, login, senha],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Usuário criado com sucesso" });
    }
  );
});

// LOGIN
router.post("/login", (req, res) => {
  const { login, senha } = req.body;

  db.query(
    "SELECT * FROM tb_usuarios WHERE login = ? AND senha = ?",
    [login, senha],
    (err, results) => {
      if (err) return res.status(500).json(err);

      if (results.length > 0) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    }
  );
});

module.exports = router;