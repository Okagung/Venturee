import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'RAHASIA_NEGARA_BALI_2026', // Ganti dengan secret yang lebih kuat nanti
      signOptions: { expiresIn: '1d' }, // Token berlaku selama 1 hari
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }