import { products } from '../repository/index.js';
import criarServico from './resourceService.js';

const servico = criarServico(products, { required: ['name', 'price', 'stock'] });

async function listar(search) {
  const items = await products.findAll();
  const termo = String(search || '').toLowerCase();
  return termo ? items.filter((item) => item.name.toLowerCase().includes(termo)) : items;
}

export default { ...servico, listar };
