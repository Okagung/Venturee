import { KeranjangService } from './keranjang.service';
import { CreateKeranjangDto } from './dto/create-keranjang.dto';
export declare class KeranjangController {
    private readonly keranjangService;
    constructor(keranjangService: KeranjangService);
    findByUser(id_user: string): Promise<({
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
    remove(id: string): Promise<{
        id_keranjang: number;
        id_user: number;
        id_event: number;
        status: string;
    }>;
}
