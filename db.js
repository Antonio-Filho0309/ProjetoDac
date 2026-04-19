const mysql = require("mysql2");

const connection = mysql.createPool({
  host: "autorack.proxy.rlwy.net",
  user: "root",
  password: "AgzvvfUZMwHzJPLmLxpAivLqsXYPZqot",
  database: "contas_a_pagar",
  port: 28434,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log("Pool de conexões criado 🚀");

module.exports = connection;