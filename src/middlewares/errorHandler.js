import { AppError } from '../shared/errors.js';

function notFound(req, _res, next) {
  next(new AppError(`Rota não encontrada: ${req.method} ${req.originalUrl}`, 404));
}

function errorHandler(error, _req, res, _next) {
  const status = error.statusCode || 500;
  if (status === 500) console.error(error);
  res.status(status).json({
    error: status === 500 ? 'Erro interno do servidor' : error.message
  });
}

export { notFound, errorHandler };
