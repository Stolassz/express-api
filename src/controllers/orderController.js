import * as orderService from '../services/orderService.js';

async function create(req, res) {
  res.status(201).json(await orderService.criar(req.user.id));
}

async function list(req, res) {
  res.json(await orderService.listar(req.user));
}

async function get(req, res) {
  res.json(await orderService.buscar(req.params.id, req.user));
}

async function update(req, res) {
  res.json(await orderService.atualizar(req.params.id, req.body.status, req.user));
}

export { create, list, get, update };
