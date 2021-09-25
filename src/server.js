const express = require ("express")
const server = express()
const routes = require('./routes')
const path = require('path')

// Usando template engine
server.set('view engine', 'ejs')

// Mudando o caminho da pasta views
server.set('views', path.join(__dirname, 'views'))

// Habilitar arquivos estaticos
server.use(express.static("public"))

// Poder usar o req.body
server.use(express.urlencoded({ extend: true }))

// Rotas
server.use(routes)

// ligando o server
server.listen(3000, () => console.log('Servidor Rodando ...'))