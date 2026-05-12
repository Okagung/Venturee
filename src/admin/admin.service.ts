import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginAdminDto } from './dto/login-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginAdminDto) {
    const admin = await this.prisma.admin.findUnique({
      where: { username: dto.username },
    });

    if (!admin) {
      throw new UnauthorizedException('Username atau password salah');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, admin.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Username atau password salah');
    }

    const token = this.jwtService.sign({
      sub: admin.id_admin,
      username: admin.username,
      role: 'admin',
    });

    return { access_token: token };
  }

  async getAllTransaksi() {
    return this.prisma.transaksi.findMany({
      include: {
        user: {
          select: {
            id_user: true,
            username: true,
            email: true,
          },
        },
      },
    });
  }

  async seedAdmin() {
    const existing = await this.prisma.admin.findUnique({
      where: { username: 'admin' },
    });

    if (existing) {
      return { message: 'Admin sudah ada' };
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    await this.prisma.admin.create({
      data: {
        username: 'admin',
        password: hashedPassword,
      },
    });

    return { message: 'Admin berhasil dibuat' };
  }
}
