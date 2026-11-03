import { carts, orders, products } from '../repository/index.js';
import { AppError } from '../shared/errors.js';

async function criar(userId) {
  const cart = await carts.findOneBy('userId', userId);
  if (!cart || !cart.items.length) throw new AppError('Carrinho vazio');
  for (const item of cart.items) {
    const product = await products.findById(item.productId);
    if (!product || product.stock < item.quantity) throw new AppError(`Estoque insuficiente para ${item.productId}`, 409);
  }
  for (const item of cart.items) {
    const product = await products.findById(item.productId);
    await products.update(product.id, { stock: product.stock - item.quantity });
  }
  const order = await orders.create({ userId, items: cart.items, total: cart.total, status: 'pending' });
  await carts.update(cart.id, { items: [], total: 0 });
  return order;
}

async function listar(user) {
  const all = await orders.findAll();
  return user.role === 'admin' ? all : all.filter((order) => order.userId === user.id);
}

async function buscar(id, user) {
  const order = await orders.findById(id);
  if (!order || (user.role !== 'admin' && order.userId !== user.id)) throw new AppError('Pedido não encontrado', 404);
  return order;
}

async function atualizar(id, status, user) {
  const order = await buscar(id, user);
  if (user.role !== 'admin' && status !== 'canceled') throw new AppError('Cliente só pode cancelar o pedido', 403);
  const statuses = ['pending', 'paid', 'shipped', 'delivered', 'canceled'];
  if (!statuses.includes(status)) throw new AppError('Status de pedido inválido');
  if (order.status !== 'pending' && status === 'canceled') throw new AppError('Somente pedidos pendentes podem ser cancelados', 409);
  return orders.update(order.id, { status });
}

export { criar, listar, buscar, atualizar };
