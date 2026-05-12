import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransaksiDto } from './dto/create-transaksi.dto';

@Injectable()
export class TransaksiService {
  constructor(private prisma: PrismaService) {}

  async findByUser(id_user: number) {
    return this.prisma.transaksi.findMany({
      where: { id_user },
    });
  }

  async findAll() {
    return this.prisma.transaksi.findMany({
      include: { user: true },
    });
  }

  async create(dto: CreateTransaksiDto) {
    return this.prisma.$transaction(async (prisma) => {
      const keranjangItems = await prisma.keranjang.findMany({
        where: { id_user: dto.id_user, status: 'Pending' },
      });

      const transaksi = await prisma.transaksi.create({
        data: {
          id_user: dto.id_user,
          total_harga: dto.total_harga,
          status: 'Sudah Dibayar',
        },
      });

      for (const item of keranjangItems) {
        await prisma.event.update({
          where: { id_event: item.id_event },
          data: { kuota: { decrement: 1 } },
        });
      }

      await prisma.keranjang.deleteMany({
        where: { id_user: dto.id_user, status: 'Pending' },
      });

      return transaksi;
    });
  }

  async updateStatus(id: number, status: string) {
    const transaksi = await this.prisma.transaksi.findUnique({
      where: { id_transaksi: id },
    });

    if (!transaksi) {
      throw new NotFoundException('Transaksi tidak ditemukan');
    }

    return this.prisma.transaksi.update({
      where: { id_transaksi: id },
      data: { status },
    });
  }
}
