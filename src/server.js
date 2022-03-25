const express = require('express')
const path = require('path')
const routes = require('./routes/routes')
const cors =  require('cors')

const server = express()

server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');

server.use(express.static(path.join(__dirname, 'public')));

server.use(express.json())
server.use(cors());

server.use(routes)
server.get('/',(req,res)=>{
    return res.render('index')
})

server.get('/clientes',(req,res)=>{
    return res.render('clientes')
})

server.get('/contas',(req,res)=>{
    return res.render('contas')
})
server.get('/agencias',(req,res)=>{
    return res.render('agencias')
})

server.listen(3000, () => console.log('http://localhost:3000'))