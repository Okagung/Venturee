import { PrismaService } from '../prisma/prisma.service';
import { CreateKeranjangDto } from './dto/create-keranjang.dto';
export declare class KeranjangService {
    private prisma;
    constructor(prisma: PrismaService);
    findByUser(id_user: number): Promise<({
        event: {
            id_event: number;
            nama_event: string;
            deskripsi_event: string | null;
            harga_event: number;
            kuota: number;
        };
    } & {
        id_keranjang: number;
        id_user: number;
        id_event: number;
        status: string;
    })[]>;
    create(dto: CreateKeranjangDto): Promise<{
        id_keranjang: number;
        id_user: number;
        id_event: number;
        status: string;
    }>;
    remove(id: number): Promise<{
        id_keranjang: number;
        id_user: number;
        id_event: number;
        status: string;
    }>;
}
