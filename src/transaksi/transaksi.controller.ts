import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { TransaksiService } from './transaksi.service';
import { CreateTransaksiDto } from './dto/create-transaksi.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('transaksi')
@UseGuards(JwtAuthGuard)
export class TransaksiController {
  constructor(private readonly transaksiService: TransaksiService) {}

  @Get()
  findAll() {
    return this.transaksiService.findAll();
  }

  @Get(':id_user')
  findByUser(@Param('id_user') id_user: string) {
    return this.transaksiService.findByUser(Number(id_user));
  }

  @Post()
  create(@Body() dto: CreateTransaksiDto) {
    return this.transaksiService.create(dto);
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.transaksiService.updateStatus(Number(id), status);
  }
}