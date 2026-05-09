const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const usuarioRoutes = require("./routes/usuario");
const pessoasRoutes = require("./routes/pessoas");
const contasRoutes = require("./routes/contas");
 app.use("/", usuarioRoutes);
 app.use("/", pessoasRoutes);
 app.use("/", contasRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});