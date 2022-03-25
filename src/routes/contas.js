const { Router } = require('express');
const router = Router();
const knex = require('../config/configBd');


router.post('/save',async(req, res)=>{
    try{
        const dadosConta = req.body
        await knex.raw(`INSERT INTO contas (id_agencia, id_cliente, saldo, tipo_conta) VALUES(${dadosConta.id_agencia}, ${dadosConta.id_cliente}, '${dadosConta.saldo}', '${dadosConta.tipo_conta}')`)
         return res.status(200).json(dadosConta)
    }catch(error){
        return res.status(500).json(error)
    }
})
router.put('/update/:id_conta', async(req, res)=>{
    try {
        const dadosConta = req.body
        const id_conta = req.params.id_conta
        await knex.raw(`UPDATE contas SET id_agencia =${dadosConta.id_agencia}, id_cliente = ${dadosConta.id_cliente}, saldo = '${dadosConta.saldo}', tipo_conta = '${dadosConta.tipo_conta}' WHERE id_conta = ${id_conta}  `)
        return res.status(200).json(dadosConta)

    } catch (error) {
        return res.status(500).json(error)
        
    }
})
router.get('/read', async(req, res)=>{
    try {

       const dadosConta = await knex.raw(` SELECT * FROM contas `)
        return res.status(200).json(dadosConta)
    } catch (error) {
        return res.status(500).json(error)
        
    }
})

router.get('/read/unico/:id_conta', async(req, res)=>{
    try {
        const id_conta = req.params.id_conta
       const dadosConta = await knex.raw(` SELECT * FROM contas WHERE id_conta = ${id_conta} `)
        return res.status(200).json(dadosConta)
    } catch (error) {
        return res.status(500).json(error)
        
    }
})

router.delete('/delete/:id_conta', async(req, res)=>{
    try {
        const id_conta = req.params.id_conta
        await knex.raw(` DELETE FROM contas WHERE id_conta = ${id_conta} `)
        return res.status(200).send('excluido com sucesso')
    } catch (error) {
        return res.status(500).json(error)
    }
})




module.exports = router