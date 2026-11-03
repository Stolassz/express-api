import { AppError } from '../shared/errors.js';

function validarCadastro({ name, email, password }) {
  if (!name || !email || !password || password.length < 6) {
    throw new AppError('Mínimo 6 caracteres são obrigatórios');
  }
}

function validarEndereco(endereco) {
  const campos = ['street', 'number', 'neighborhood', 'city', 'state', 'zipCode'];
  const ausentes = campos.filter((campo) => endereco[campo] === undefined || endereco[campo] === '');
  if (ausentes.length) {
    throw new AppError(`Campos obrigatórios do endereço: ${ausentes.join(', ')}`);
  }
}

export { validarCadastro, validarEndereco };
