import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async login(email: string, pass: string) {
    // 1. Cari user berdasarkan email
    const users = await this.usersService.findAll();
    const user = users.find((u) => u.email_user === email);

    if (!user) {
      throw new UnauthorizedException('Email tidak terdaftar, Gung!');
    }

    // 2. Bandingkan password (Bcrypt akan mengecek hash-nya)
    const isMatch = await bcrypt.compare(pass, user.pw_user);

    if (!isMatch) {
      throw new UnauthorizedException('Password salah, cek lagi!');
    }

    // 3. Jika cocok, buatkan "KTP Digital" (Token JWT)
    const payload = { sub: user.id_user, email: user.email_user };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        nama: user.nama_user,
        email: user.email_user,
      },
    };
  }
}