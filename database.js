import postgres from 'postgres';
import 'dotenv/config';

// Desestruturação das variáveis de ambiente
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

// Decodifica a senha, se necessário
const decodedPassword = decodeURIComponent(PGPASSWORD);

// Configuração da conexão com o banco de dados
const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: decodedPassword,
  port: 5432,
  ssl: 'require',
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

// Exporta a conexão com o banco de dados
export default sql;
