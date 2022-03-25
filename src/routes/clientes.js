const { Router } = require('express');
const router = Router();
const knex = require('../config/configBd');

router.post('/save', async(req, res) =>{
    try {
        const dadosCliente = req.body
        console.log(dadosCliente)
        await knex.raw(`INSERT INTO clientes (nome, cpf, endereco, email, sexo)
        VALUES ('${dadosCliente.nome}', '${dadosCliente.cpf}','${dadosCliente.endereco}','${dadosCliente.email}','${dadosCliente.sexo}');`)
       
        return res.status(200).json(dadosCliente)
        
    } catch (error) {
        return res.status(500).send(error)
    }
})

router.get('/read', async(req, res) =>{
    try {
        const dadosCliente = await knex.raw(`SELECT * FROM clientes;`)
       
        return res.status(200).json(dadosCliente)
        
    } catch (error) {
        return res.status(500).send("Erro ao psquisar")
    }
})
router.get('/read/unico/:id_cliente', async(req, res) =>{
    try {
        const id_cliente = req.params.id_cliente

        const dadosCliente = await knex.raw(`SELECT * FROM clientes WHERE id_cliente = ${id_cliente};`)
       
        return res.status(200).json(dadosCliente)
        
    } catch (error) {
        return res.status(500).send("Erro ao psquisar")
    }
})

router.put('/update/:id_cliente', async(req, res) =>{
    try {
        const dadosCliente = req.body
        const id_cliente = req.params.id_cliente

        console.log(dadosCliente)
       await knex.raw(`UPDATE clientes SET nome = '${dadosCliente.nome}', cpf = '${dadosCliente.cpf}',endereco = '${dadosCliente.endereco}',email = '${dadosCliente.email}',sexo = '${dadosCliente.sexo}' WHERE id_cliente = ${id_cliente};`)
       
        return res.status(200).json(dadosCliente)
        
    } catch (error) {
        return res.status(500).send(error)
    }
})

router.delete('/delete/:id_cliente', async(req, res, ) =>{
    try {
        const id_cliente = req.params.id_cliente
        console.log(id_cliente)
       await knex.raw(`DELETE FROM clientes WHERE id_cliente = ${id_cliente};`)
       
        return res.status(200).send('registro deletado')
        
    } catch (error) {
        return res.status(500).send('Não foi possível deletar o registro devido a vinculo com outra tabela')
    }
})

module.exports = router;
