const express = require("express");
const apiRouter = express.Router ();
const knex = require('knex') ({
    client: 'pg',
    connection: {
        connectionString : process.env.DATABASE_URL, 
        ssl: {
            rejectUnauthorized: false 
        }, 
    }
})

apiRouter.get("/alunos", function (req, res){
    knex
        .select('*')
        .from('alunos')
        .then(alunos => res.status(200).json(alunos))
        .catch(err => {
            res.status(500).json({
                message: `Erro ao recuperar alunos: ${err.message}`
            })
        })
})

apiRouter.get("/alunos/:id", function (req, res){
    let idParams = Number.parseInt(req.params.id)

    knex
        .select('*')
        .from('alunos')
        .where({id: idParams})
        .then(alunos => res.status(200).json(alunos))
        .catch(err => {
            res.status(500).json({
                message: `Erro ao recuperar alunos: ${err.message}`
            })
        })
})

apiRouter.post("/alunos", express.json(), function (req, res){
    knex ('alunos')
        .insert({
            nome: req.body.nome,
            idade: req.body.idade,
            nota_total: req.body.nota_total},
            ['id', 'nome', 'idade', 'nota_total'])
        .then(alunos => {
            let aluno = alunos[0]
            res.status(200).json({aluno})
        })
        .catch (err => {
            res.status(500).json({message: `Erro ao inserir aluno: ${err.message}`})
        })
})

apiRouter.put("/alunos/:id", express.json(), function(req, res) {
    let id = Number.parseInt(req.params.id);

    if (id > 0) {
        knex ('alunos')
            .where('id', id)
            .update({
                nome: req.body.nome,
                idade: req.body.idade,
                nota_total: req.body.nota_total
            },
            ['id', 'nome', 'idade', 'nota_total'])
            .then(alunos => {
                let aluno = alunos[0]
                res.status(200).json({aluno})
            })
            .catch(err => {
                res.status(500).json({message: `Erro ao atualizar dados do aluno: ${err.message}`})
            })
    } else {
        res.status(404).json({message: 'Aluno não encontrado!'})
    }
})

apiRouter.delete("/alunos/:id", express.json(), function (req, res) {
    let id = Number.parseInt(req.params.id);

    if (id > 0) {
        knex ('alunos')
            .where('id', id)
            .del()
            .then(alunos => {
                res.status(200).json({message: `Dados do aluno ${id} deletado com sucesso!`})
            })
            .catch(err => {
                res.status(500).json({message: `Erro ao deletar dados do aluno: ${err.message}`})
            })
    } else {
        res.status(404).json({message: 'Aluno não encontrado!'})
    }
   
})

module.exports = apiRouter