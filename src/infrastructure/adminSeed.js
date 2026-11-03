import bcrypt from 'bcryptjs';
import { users } from '../repository/index.js';
import { adminEmail, adminPassword } from '../config/env.js';

async function criarAdminInicial() {
  if (!adminEmail || !adminPassword) {
    console.warn('Administrador inicial não configurado: defina ADMIN_EMAIL e ADMIN_PASSWORD no .env');
    return;
  }

  if (adminPassword.length < 6) {
    throw new Error('ADMIN_PASSWORD deve ter no mínimo 6 caracteres');
  }

  const email = adminEmail.trim().toLowerCase();
  if (await users.findByEmail(email)) return;

  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await users.create({
    name: 'Administrador',
    email,
    passwordHash,
    role: 'admin'
  });
  console.log(`Administrador inicial criado: ${email}`);
}

export default criarAdminInicial;
