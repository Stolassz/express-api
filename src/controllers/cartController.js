import * as cartService from '../services/cartService.js';

async function getCart(req, res) {
  res.json(await cartService.obter(req.user.id));
}

async function addItem(req, res) {
  res.json(await cartService.adicionar(req.user.id, req.body.productId, req.body.quantity));
}

async function clear(req, res) {
  await cartService.limpar(req.user.id);
  res.status(204).send();
}

async function updateItem(req, res) {
  res.json(await cartService.atualizarItem(req.user.id, req.params.productId, Number(req.body.quantity)));
}

async function removeItem(req, res) {
  res.json(await cartService.removerItem(req.user.id, req.params.productId));
}

export { getCart, addItem, updateItem, removeItem, clear };
