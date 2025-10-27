const jwt = require("jsonwebtoken")
const SECRET = process.env.SECRET

function autenticar(req, res, next){
    const authHeader = req.headers["authorization"]

    if (!authHeader) return res.status(401).json({msg: "Você precisa estar logado"})
    
    const header = authHeader.split(" ")
    const token = header[1]

    if (!token) return res.status(401).json({msg: "Você precisa estar logado"})

    jwt.verify(token, SECRET, (err, user) => {
        if (err) return res.status(403).json({msg: "Sessão invalida"})
        req.user = user
        next()
    })
}

module.exports = {autenticar}