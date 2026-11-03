import { AppError } from '../shared/errors.js';

function validarObrigatorios(body, campos) {
  const ausentes = campos.filter((campo) => body[campo] === undefined || body[campo] === '');
  if (ausentes.length) throw new AppError(`Campos obrigatórios: ${ausentes.join(', ')}`);
}

export { validarObrigatorios };
