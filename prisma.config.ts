import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';

// Muat file .env secara manual agar CLI Prisma bisa membaca DATABASE_URL
dotenv.config();

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});