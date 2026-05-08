import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginAdminDto } from './dto/login-admin.dto';
export declare class AdminService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(dto: LoginAdminDto): Promise<{
        access_token: string;
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
    seedAdmin(): Promise<{
        message: string;
    }>;
}
