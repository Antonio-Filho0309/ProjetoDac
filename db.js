const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "autorack.proxy.rlwy.net",
  user: "root",
  password: "AgzvvfUZMwHzJPLmLxpAivLqsXYPZqot",
  database: "contas_a_pagar",
  port: 28434,
  rejectUnauthorized: false
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar:", err);
  } else {
    console.log("Conectado ao Railway 🚀");
  }
});

module.exports = connection;