const conexao = require('../config/conexao')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

require('dotenv').config()

exports.login = (req, res) => {
  
  const email = req.body.email
  const senha = req.body.senha

  const query = "select * from usuarios where email=?"

  conexao.query(query, [email], (err, rows) => {
    if (err){
      res.status(500)
      res.json({"auth": false, "messege": "Internet Server Error"})
      console.log(err)
    }else if (rows.length > 0){
      bcrypt.compare(senha, rows[0].senha, (err, resp) => {
        if(resp){
          const usuario = rows[0].id
          jwt.sign({usuario}, process.env.SECRET, {expiresIn: 30}, (err, token)=>{
            res.status(200)
            res.json({"auth": true, "token": token})
          })
        }else{
          res.status(403)
          res.json({"auth": false, "messege": "E-mail ou senha inválidos"})
        }
      })
      
    }else{
      res.status(403)
      res.json({"auth": false, "messege": "E-mail ou senha inválidos"})
    }
  })
}

exports.verifica = (req, res, next) => {
  const token = req.headers('access-token')

  if(!token){
    res.status(401)
    res.send({"auth": false, "message": "Token em branco"})
  } else {
    jwt.verify(token, process.env.SECRET, (err, decode) => {
      if(err){
        res.status(403)
        res.send({"auth": false, "message": "Falha de autenticação"})
      }else{
        next()
      }
    })
  }
}
