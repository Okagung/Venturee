import { TransaksiService } from './transaksi.service';
import { CreateTransaksiDto } from './dto/create-transaksi.dto';
export declare class TransaksiController {
    private readonly transaksiService;
    constructor(transaksiService: TransaksiService);
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
    findByUser(id_user: string): Promise<{
        id_transaksi: number;
        id_user: number;
        total_harga: number;
        status: string;
    }[]>;
    create(dto: CreateTransaksiDto): Promise<{
        id_transaksi: number;
        id_user: number;
        total_harga: number;
        status: string;
    }>;
    updateStatus(id: string, status: string): Promise<{
        id_transaksi: number;
        id_user: number;
        total_harga: number;
        status: string;
    }>;
}
