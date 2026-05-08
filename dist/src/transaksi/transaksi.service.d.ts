import { PrismaService } from '../prisma/prisma.service';
import { CreateTransaksiDto } from './dto/create-transaksi.dto';
export declare class TransaksiService {
    private prisma;
    constructor(prisma: PrismaService);
    findByUser(id_user: number): Promise<{
        id_transaksi: number;
        id_user: number;
        total_harga: number;
        status: string;
    }[]>;
    findAll(): Promise<({
        user: {
            id_user: number;
            username: string;
            email: string;
            password: string;
        };
    } & {
        id_transaksi: number;
        id_user: number;
        total_harga: number;
        status: string;
    })[]>;
    create(dto: CreateTransaksiDto): Promise<{
        id_transaksi: number;
        id_user: number;
        total_harga: number;
        status: string;
    }>;
    updateStatus(id: number, status: string): Promise<{
        id_transaksi: number;
        id_user: number;
        total_harga: number;
        status: string;
    }>;
}
