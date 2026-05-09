const mysql = require("mysql2");

const connection = mysql.createPool({
  host: "switchyard.proxy.rlwy.net",
  user: "root",
  password: "nsvpmMcQGkKyZjpJtzUcPOzbTyjOzNEL",
  database: "contas_a_pagar",
  port: 23264,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log("Pool de conexões criado 🚀");

module.exports = connection;