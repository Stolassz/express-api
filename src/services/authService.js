import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { addresses, users } from '../repository/index.js';
import { jwtSecret, jwtExpiresIn } from '../config/env.js';
import { AppError } from '../shared/errors.js';
import { validarCadastro, validarEndereco } from '../validators/authValidators.js';

function usuarioPublico(user) {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

async function cadastrar({ name, email, password, address }) {
  validarCadastro({ name, email, password });
  if (address !== undefined && address !== null) validarEndereco(address);
  const normalizedEmail = email.trim().toLowerCase();
  if (await users.findByEmail(normalizedEmail)) throw new AppError('E-mail já cadastrado', 409);
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await users.create({ name: name.trim(), email: normalizedEmail, passwordHash, role: 'customer' });
  if (address !== undefined && address !== null) {
    await addresses.create({ ...address, userId: user.id });
  }
  return usuarioPublico(user);
}

async function autenticar({ email, password }) {
  const user = await users.findByEmail(String(email || '').trim().toLowerCase());
  if (!user || !(await bcrypt.compare(password || '', user.passwordHash))) {
    throw new AppError('E-mail ou senha inválidos', 401);
  }
  const token = jwt.sign({ sub: user.id, role: user.role }, jwtSecret, { expiresIn: jwtExpiresIn });
  return token;
}

export { cadastrar, autenticar, usuarioPublico };
