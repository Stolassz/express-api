import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/env.js';
import { AppError } from '../shared/errors.js';
import { users } from '../repositories/index.js';

async function authenticate(req, _res, next) {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      throw new AppError('Token de autenticação não informado', 401);
    }
    const payload = jwt.verify(header.slice(7), jwtSecret);
    const user = await users.findById(payload.sub);
    if (!user) throw new AppError('Usuário não encontrado', 401);
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof AppError) return next(error);
    return next(new AppError('Token inválido ou expirado', 401));
  }
}

function requireAdmin(req, _res, next) {
  if (req.user.role !== 'admin') return next(new AppError('Acesso administrativo necessário', 403));
  return next();
}

export { authenticate, requireAdmin };
