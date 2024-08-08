import { fastify } from 'fastify'
import { db } from './db.js'
import { db_postgres } from './db_postgres.js'

const server = fastify()
const database_testes = new db()
const database_postgres = new db_postgres()

const database = database_postgres

server.post('/user', async (request, reply) => {
    const { nome, email, senha } = request.body

    await database.create({
        nome,
        email,
        senha,
    })

    return reply.status(201).send() // informar o status code da requisição
})

server.get('/user', async (request, reply) => {
    const search = request.query.search

    const users = await database.list(search)

    if (users.length === 0) {
        return reply.status(404).send({ message: 'No users found' });
    }

    return users
})

server.put('/user/:userId', async (request, reply) => {
    const id = request.params.userId
    const { nome, email, senha } = request.body

    try {
        await database.update(id, {
            nome, email, senha,
        })

        return reply.status(204).send()
    } catch (error) {
        return reply.status(404).send({ error: error.message })
    }
})

server.delete('/user/delete/:userId', async (request, reply) => {
    const id = request.params.userId

    try {
        await database.delete(id)
        return reply.status(204).send()
    } catch (error) {
        return reply.status(404).send({ error: error.message })
    }
})

//comentando
server.listen({
    port: process.env.PORT ?? 3333,
})
