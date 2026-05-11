import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.event.findMany();
  }

  async findOne(id: number) {
    const event = await this.prisma.event.findUnique({
      where: { id_event: id },
    });

    if (!event) {
      throw new NotFoundException('Event tidak ditemukan');
    }

    return event;
  }

  async create(dto: CreateEventDto) {
    return this.prisma.event.create({
      data: {
        nama_event: dto.nama_event,
        deskripsi_event: dto.deskripsi_event,
        harga_event: dto.harga_event,
        kuota: dto.kuota,
      },
    });
  }

  async update(id: number, dto: CreateEventDto) {
    return this.prisma.event.update({
      where: { id_event: id },
      data: {
        nama_event: dto.nama_event,
        deskripsi_event: dto.deskripsi_event,
        harga_event: dto.harga_event,
        kuota: dto.kuota,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.event.delete({
      where: { id_event: id },
    });
  }

  async search(keyword: string) {
    return this.prisma.event.findMany({
      where: {
        nama_event: {
          contains: keyword,
          mode: 'insensitive',
        },
      },
    });
  }
}
