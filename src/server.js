import criarAdministrador from './infrastructure/adminSeed.js'
import { verificarConexao } from "./infrastructure/mysql.js";
import { port } from "./config/env.js"
import app from "./app.js";

verificarConexao()
    .then(criarAdministrador)
    .then(() => app.listen(port, '0.0.0.0', () => console.log(`GT Store API disponível em: http://localhost:${port}`)))
    .catch((erro) => {
        console.log('Não foi possível iniciar a API', erro);
        process.exitCode = 1;
    });