const express = require("express");
const clientRouter = express.Router ();

clientRouter.use (express.static ('public'))
clientRouter.use ('/template', (req, res) => {
    res.render ('index', {
        nome: 'visitantes queridos!',
        message: 'Sejam bem-vindos ao meu site de estudos de Node.JS com persistência no PostgreSQL'
    })
})

module.exports = clientRouter