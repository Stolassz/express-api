import * as authService from '../services/authService.js';

async function register(req, res) {
  res.status(201).json(await authService.cadastrar(req.body));
}

async function login(req, res) {
  res.json({ token: await authService.autenticar(req.body) });
}

const publicUser = authService.usuarioPublico;

export { register, login, publicUser };
