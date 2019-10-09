const conexao = require('../config/conexao')

exports.listar=(req, res) => {
  
  const query = "select * from tarefas"

  conexao.query(query, (err, rows) =>{
    if (err){
      res.status(500)
      res.json({"message: ": "Internet Server Error"})
    }else if (rows.length > 0){
      res.status(200)
      res.json(rows)
    }else{
      res.status(404)
      res.json({"message": "Nenhuma tarefa encontrada"})
    }
  })
}
exports.listarPorId = (req, res) => {

  const id = req.params.id
  const query = "select * from tarefas where id = ?"

  conexao.query(query, [id], (err, rows) =>{
    if (err){
      res.status(500)
      res.json({"message: ": "Internet Server Error"})
    }else if (rows.length > 0){
      res.status(200)
      res.json(rows)
    }else{
      res.status(404)
      res.json({"message": "Nenhuma tarefa encontrada"})
    }
  })
}

exports.inserir = (req, res) => {

  const tarefa = {}
  tarefa.descricao = req.body.descricao
  tarefa.data = req.body.data
  tarefa.realizado = req.body.realizado
  tarefa.categoria_id = req.body.categoria_id

  const query = "insert into tarefas (descricao, data, realizado, categoria_id) values (?, ?, ?, ?)"

  conexao.query(query, [tarefa.descricao, tarefa.data, tarefa.realizado, tarefa.categoria_id], (err, rows) =>{
    if (err){
      res.status(500)
      res.json({"message: ": "Internet Server Error"})
    }else {
      res.status(201)
      res.json({"message: ": "Tarefa criada com sucesso", "id": rows.insertId})
    }
  })
}

