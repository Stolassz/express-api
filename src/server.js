import app from "./app.js";
import { port } from "./config/env.js"
import { verificarConexao } from "./infrastructure/mysql.js";

verificarConexao()
.then(() => app.listen(port, '0.0.0.0', () => console.log(`GT Store API disponível em: http://localhost:${port}`)))
.catch((erro) => {
    console.log('Não foi possível iniciar a API', erro);
    process.exitCode = 1;
});