const { Router } = require('express')
const router = Router()

const clientes = require('./clientes');
const agencias = require('./agencias');
const contas = require('./contas');


router.use('/clientes', clientes);
router.use('/agencias', agencias);
router.use('/contas', contas);


module.exports = router
