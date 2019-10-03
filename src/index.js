const express = require('express')
const morgan = require('morgan')
const app = express()
require('dotenv').config()

app.use(morgan('combined'))

//rotas (URN)
const tarefaRoute = require('./routes/tarefaRoute')
app.use('/api/v1/tarefas', tarefaRoute)

const port=process.env.PORT

app.listen(port, () => {
  console.log(`Servidor na porta: ${port}`)
})
