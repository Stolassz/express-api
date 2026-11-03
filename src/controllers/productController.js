import productService from '../services/productService.js';

async function list(req, res) {
  res.json(await productService.listar(req.query.search));
}

export default {
  list,
  get: async (req, res) => res.json(await productService.buscar(req.params.id, req.user)),
  create: async (req, res) => res.status(201).json(await productService.criar(req.body, req.user)),
  update: async (req, res) => res.json(await productService.atualizar(req.params.id, req.body, req.user)),
  remove: async (req, res) => { await productService.remover(req.params.id, req.user); res.status(204).send(); }
};
