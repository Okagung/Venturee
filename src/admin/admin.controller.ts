import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoginAdminDto } from './dto/login-admin.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  login(@Body() dto: LoginAdminDto) {
    return this.adminService.login(dto);
  }

  @Post('seed')
  seed() {
    return this.adminService.seedAdmin();
  }

  @Get('transaksi')
  @UseGuards(JwtAuthGuard)
  getAllTransaksi() {
    return this.adminService.getAllTransaksi();
  }
}