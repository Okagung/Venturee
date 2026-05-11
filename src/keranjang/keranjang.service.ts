import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateKeranjangDto } from './dto/create-keranjang.dto';

@Injectable()
export class KeranjangService {
  constructor(private prisma: PrismaService) {}

  async findByUser(id_user: number) {
    return this.prisma.keranjang.findMany({
      where: { id_user },
      include: { event: true },
    });
  }

  async create(dto: CreateKeranjangDto) {
    return this.prisma.keranjang.create({
      data: {
        id_user: dto.id_user,
        id_event: dto.id_event,
        status: 'Pending',
      },
    });
  }

  async remove(id: number) {
    const item = await this.prisma.keranjang.findUnique({
      where: { id_keranjang: id },
    });

    if (!item) {
      throw new NotFoundException('Item keranjang tidak ditemukan');
    }

    return this.prisma.keranjang.delete({
      where: { id_keranjang: id },
    });
  }
}
