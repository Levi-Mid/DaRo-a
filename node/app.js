require("dotenv").config()
const express = require("express")
const cors = require("cors")
const {conectaBD} = require("./config/db")
const comentariosRoute = require("./routes/comentariosRoute")
const usuariosRoute = require("./routes/usuariosRoute")
const produtosRoute = require("./routes/produtosRoute")
const carrinhoRoute = require("./routes/carrinhoRoute");

const app = express()
const porta = process.env.PORTA || 8088

//middlewares
app.use(cors({origin: "*"}))
app.use(express.json())

//rotas
app.use("/comentarios", comentariosRoute)
app.use("/usuarios", usuariosRoute)
app.use("/produtos", produtosRoute)
app.use("/carrinho", carrinhoRoute);

//Rota principal
app.get("/", (req, res) => {
    res.json({mensagem: "Servidor em execução"})
})

//Inicia o banco de dados e o servidor
conectaBD()
app.listen(porta, () => console.log(`API em execução em ${porta}`))