import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

// Pastikan file .env dibaca sebelum apa pun!
dotenv.config();

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // Pada Prisma 7, engine bawaan sudah dihapus. Kita WAJIB menggunakan driver adapter
    // sesuai database yang digunakan (dalam hal ini PostgreSQL menggunakan 'pg').
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    const adapter = new PrismaPg(pool);
    
    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('✅ DATABASE TERHUBUNG DENGAN SUKSES!');
    } catch (error) {
      console.error('❌ GAGAL NYAMBUNG KE DATABASE:', error);
    }
  }
}