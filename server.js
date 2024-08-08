// *** ctrl+k > ctrl+u - Comentar bloco de código selecionado

// import { createServer } from 'node:http' // Pra usar import tem que ter um package.json com type:module para usar js com poo

// const server = createServer((request, response) => {
//     response.write("oi")

//     return response.end()
// })

// server.listen(3333)

import { fastify } from 'fastify'
import { db } from './db.js'

const server = fastify()
const database = new db()

server.post('/user', (request, reply) => {

    const { nome, email, senha } = request.body

    database.create({
        nome,
        email,
        senha,
    })

    return reply.status(201).send() // informar o status code da requisição
})

server.get('/user', (request, reply) => {
    const search = request.query.search

    if (database.list(search).length === 0){
        return reply.status(404).send({ message: 'No users found' });
 
    }
    return database.list(search)
})

server.put('/user/:userId', (request, reply) => {
    const id = request.params.userId
    const { nome, email, senha } = request.body

    try {
        database.update(id, {
            nome, email, senha,
        })

        return reply.status(204).send()
    } catch (error) {
        return reply.status(404).send({ error: error.message })
    }
})

server.delete('/user/delete/:userId', (request, reply) => {
    const id = request.params.userId

    try {
        database.delete(id)
        return reply.status(204).send()
    } catch (error) {
        return reply.status(404).send({ error: error.message })
    }
})

server.listen({
    port: 3333,
})