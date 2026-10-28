import mysql from 'mysql2/promise';
import { database } from '../config/env.js';

const pool = mysql.createPool({
    ...database,
    waitForConnections: true,
    connectionLimit: 10,
    decimalNumbers: true
});

async function verificarConexao() {
    const connection = await pool.getConnection();
    try {
        await connection.query('SELECT 1');
        console.log('Conexão com o bando deu bom!');
    } finally {
        connection.release();
    }
}

export { pool, verificarConexao };