const { Router } = require('express');
const router = Router();
const knex = require('../config/configBd');

router.post('/save', async (req, res) => {
    try {
       const dadosAgencia = req.body
       await knex.raw(`INSERT INTO agencias (nome, endereco) VALUES('${dadosAgencia.nome}', '${dadosAgencia.endereco}');`)
       return res.status(200).json(dadosAgencia)
  
    } catch (error) {
        return res.status(500).send('erro ao salvar')
    }
})
router.put('/update/:id_agencia', async (req, res) => {
    try {
       const dadosAgencia = req.body
       const id_agencia = req.params.id_agencia
       await knex.raw(`UPDATE agencias SET nome = '${dadosAgencia.nome}',endereco= '${dadosAgencia.endereco}'WHERE id_agencia = ${id_agencia};`)
       return res.status(200).json(dadosAgencia)
  
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.get('/read', async (req, res) => {
    try {
       const agencias = await knex.raw(`SELECT * FROM agencias`)
       return res.status(200).json(agencias)
    } catch (error) {
        return res.status(500).send('erro ao salvar')
    }
})

router.get('/read/unico/:id_agencia', async (req, res) => {
    try {
       const id_agencia = req.params.id_agencia

       const agencias = await knex.raw(`SELECT * FROM agencias WHERE id_agencia = ${id_agencia}`)
       console.log(agencias)
       return res.status(200).json(agencias)
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.delete('/delete/:id_agencia', async (req, res) => {
    try {
       const id_agencia = req.params.id_agencia

       await knex.raw(`DELETE FROM agencias WHERE id_agencia = ${id_agencia}`)
       return res.status(200).send('salvo')
    } catch (error) {
        return res.status(500).json(error)
    }
})


module.exports = router