// export para permitir ser chamado no import (server.js)
import { randomUUID } from "crypto"
import sql from './database.js'

export class db_postgres {

    async create(user) {
        const { nome, email, senha } = user

        await sql   `INSERT INTO users (nome, email, senha) 
                     VALUES (${nome}, ${email}, ${senha}) 
                    RETURNING userId;`
    }

    async list(search) {
        if (search) {
            return await sql `SELECT * FROM users WHERE nome ILIKE ${'%' + search + '%'} OR email ILIKE ${'%' + search + '%'}`
        }
    
        return await sql `SELECT * FROM users`
    }

    async update(id, user) {
        // Verificar se o ID existe
        const existingUser = await sql`SELECT * FROM users WHERE userid = ${id}`
    
        if (existingUser.length === 0) {
            throw new Error('User not found')
        }
    
        // Atualizar o usuário
        await sql`
            UPDATE users
            SET 
                nome = ${user.nome},
                email = ${user.email},
                senha = ${user.senha}
            WHERE userid = ${id}
        `
    }
        

    async delete(userId) {
        return await sql`DELETE FROM users WHERE userid = ${userId}`
    }
}