require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

const clientRouter = require('./routes/clientRouter')
const apiRouter = require('./routes/apiRouter')

const app = express();

const port = process.env.PORT || 3000

app.set ('view engine', 'ejs')
app.set ('views', 'views')

app.use (morgan ('common'))
app.use ('/api', apiRouter)
app.use ('/site', clientRouter)

app.listen(port, ()=>{
    console.log(`Aplicação rodando em http://localhost:${port}`);
});