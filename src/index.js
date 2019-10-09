const express = require('express')
const morgan = require('morgan')
const app = express()
const YAML = require('yamljs')
const swaggerUI = require('swagger-ui-express')
const bodyParser = require('body-parser')

//Transformando o corpo da requisição no formato JSON
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

require('dotenv').config()

//logs
app.use(morgan('combined'))

//Documentação da API
const swaggerDocument = YAML.load('./docs/swagger.yml')
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

//rotas (URN)
const tarefaRoute = require('./routes/tarefaRoute')
app.use('/api/v1/tarefas', tarefaRoute)

//porta da aplicação
const port=process.env.PORT

app.listen(port, () => {
  console.log(`Servidor na porta: ${port}`)
})
