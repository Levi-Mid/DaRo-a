const jwt = require("jsonwebtoken")
const SECRET = process.env.SECRET

function autenticar(req, res, next){
    const authHeader = req.headers["authorization"]

    if (!authHeader) return res.status(401).json({msg: "sem token"})
    
    const header = authHeader.split(" ")
    const token = header[1]

    if (!token) return res.status(401).json({msg: "sem token"})

    jwt.verify(token, SECRET, (err, user) => {
        if (err) return res.status(403).json({msg: "token expirado ou invalido"})
        req.user = user
        next()
    })
}

module.exports = {autenticar}