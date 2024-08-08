// export para permitir ser chamado no import (server.js)
import { randomUUID } from "crypto"

export class db{
    #users = new Map()

    create(user) {
        const userId = randomUUID() // Método do js para criar id único
        this.#users.set(userId, user)
        return userId
    }

    update(userId, user) {
        if (!this.#users.has(userId)){
            throw new Error('User not found');
        }

        this.#users.set(userId, user)       
    }

    list(search) {
        const array = Array.from(this.#users.entries());
    
        if (search) {
            return array.filter(([key, user]) => 
                user.nome.includes(search) || user.email.includes(search)
            );
        }
    
        return array;
    }

    delete(userId){
        if (!this.#users.has(userId)){
            throw new Error('User not found')
        }

        this.#users.delete(userId)
    }
}