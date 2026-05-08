import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { KeranjangService } from './keranjang.service';
import { CreateKeranjangDto } from './dto/create-keranjang.dto';

@Controller('keranjang')
export class KeranjangController {
  constructor(private readonly keranjangService: KeranjangService) {}

  @Get(':id_user')
  findByUser(@Param('id_user') id_user: string) {
    return this.keranjangService.findByUser(Number(id_user));
  }

  @Post()
  create(@Body() dto: CreateKeranjangDto) {
    return this.keranjangService.create(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.keranjangService.remove(Number(id));
  }
}