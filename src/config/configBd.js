 
const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        port:3306,
        password: '12345',
        database: 'banco_sem_calote',
    }
});



module.exports = knex;