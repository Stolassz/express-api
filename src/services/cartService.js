import { carts, products } from '../repository/index.js';
import { AppError } from '../shared/errors.js';
import { validarQuantidade } from '../validators/cartValidator.js';

function totalizar(items) {
  return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}

async function obter(userId) {
  return (await carts.findOneBy('userId', userId)) || { userId, items: [], total: 0 };
}

async function adicionar(userId, productId, quantity = 1) {
  validarQuantidade(quantity);
  if (!productId) throw new AppError('productId e quantity válido são obrigatórios');
  const product = await products.findById(productId);
  if (!product) throw new AppError('Produto não encontrado', 404);
  if (product.stock < quantity) throw new AppError('Estoque insuficiente', 409);
  const cart = await carts.findOneBy('userId', userId);
  const items = cart ? [...cart.items] : [];
  const existing = items.find((item) => item.productId === productId);
  if (existing) existing.quantity += quantity;
  else items.push({ productId, quantity, unitPrice: Number(product.price) });
  const attributes = { items, total: totalizar(items) };
  return cart ? carts.update(cart.id, attributes) : carts.create({ userId, ...attributes });
}

async function limpar(userId) {
  const cart = await carts.findOneBy('userId', userId);
  if (cart) await carts.update(cart.id, { items: [], total: 0 });
}

async function atualizarItem(userId, productId, quantity) {
  validarQuantidade(quantity);
  const cart = await carts.findOneBy('userId', userId);
  const item = cart && cart.items.find((entry) => entry.productId === productId);
  if (!cart || !item) throw new AppError('Item não encontrado no carrinho', 404);
  const product = await products.findById(productId);
  if (!product || product.stock < quantity) throw new AppError('Estoque insuficiente', 409);
  item.quantity = quantity;
  return carts.update(cart.id, { items: cart.items, total: totalizar(cart.items) });
}

async function removerItem(userId, productId) {
  const cart = await carts.findOneBy('userId', userId);
  if (!cart) throw new AppError('Carrinho não encontrado', 404);
  const items = cart.items.filter((item) => item.productId !== productId);
  if (items.length === cart.items.length) throw new AppError('Item não encontrado no carrinho', 404);
  return carts.update(cart.id, { items, total: totalizar(items) });
}

export { obter, adicionar, limpar, atualizarItem, removerItem };
