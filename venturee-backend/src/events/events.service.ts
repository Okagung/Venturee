import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  create(createEventDto: CreateEventDto) {
    return this.prisma.event.create({
      data: createEventDto as any,
    });
  }

  findAll() {
    return this.prisma.event.findMany();
  }

  findOne(id: number) {
    return this.prisma.event.findUnique({
      where: { id_event: id },
    });
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return this.prisma.event.update({
      where: { id_event: id },
      data: updateEventDto as any,
    });
  }

  remove(id: number) {
    return this.prisma.event.delete({
      where: { id_event: id },
    });
  }
}