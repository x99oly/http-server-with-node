import sql from './database.js'

//  sql `DROP TABLE IF EXISTS users;` 
// .then (() =>{
//     console.log('Tabela apagada!');
// })

sql`
    CREATE TABLE users (
    userId SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);
`
    .then(() => {
        console.log('Tabela Criada!')
    })