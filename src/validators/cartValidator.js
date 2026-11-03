import { AppError } from '../shared/errors.js';

function validarQuantidade(quantity) {
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new AppError('quantity deve ser um inteiro positivo');
  }
}

export { validarQuantidade };
