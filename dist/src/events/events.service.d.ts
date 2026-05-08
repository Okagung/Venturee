import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
export declare class EventsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id_event: number;
        nama_event: string;
        deskripsi_event: string | null;
        harga_event: number;
        kuota: number;
    }[]>;
    findOne(id: number): Promise<{
        id_event: number;
        nama_event: string;
        deskripsi_event: string | null;
        harga_event: number;
        kuota: number;
    }>;
    create(dto: CreateEventDto): Promise<{
        id_event: number;
        nama_event: string;
        deskripsi_event: string | null;
        harga_event: number;
        kuota: number;
    }>;
    update(id: number, dto: CreateEventDto): Promise<{
        id_event: number;
        nama_event: string;
        deskripsi_event: string | null;
        harga_event: number;
        kuota: number;
    }>;
    remove(id: number): Promise<{
        id_event: number;
        nama_event: string;
        deskripsi_event: string | null;
        harga_event: number;
        kuota: number;
    }>;
    search(keyword: string): Promise<{
        id_event: number;
        nama_event: string;
        deskripsi_event: string | null;
        harga_event: number;
        kuota: number;
    }[]>;
}
