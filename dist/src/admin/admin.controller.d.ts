import { AdminService } from './admin.service';
import { LoginAdminDto } from './dto/login-admin.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    login(dto: LoginAdminDto): Promise<{
        access_token: string;
    }>;
    seed(): Promise<{
        message: string;
    }>;
    getAllTransaksi(): Promise<({
        user: {
            username: string;
            password: string;
            id_user: number;
            email: string;
        };
    } & {
        id_transaksi: number;
        id_user: number;
        total_harga: number;
        status: string;
    })[]>;
}
