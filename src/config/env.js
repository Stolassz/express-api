import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const candidatePaths = [
    path.resolve(__dirname, '..', '..', '.env'),
    path.resolve(process.cwd(), '.env'),
    path.resolve(__dirname, '.env')
];

const envFilePath = candidatePaths.find((candidate) => fs.existsSync(candidate));

if (envFilePath) {
    dotenv.config({ path: envFilePath });
} else {
    dotenv.config();
}

export const port = Number(process.env.PORT || 3000);

export const database = {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};