"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransaksiService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TransaksiService = class TransaksiService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByUser(id_user) {
        return this.prisma.transaksi.findMany({
            where: { id_user },
        });
    }
    async findAll() {
        return this.prisma.transaksi.findMany({
            include: { user: true },
        });
    }
    async create(dto) {
        return this.prisma.transaksi.create({
            data: {
                id_user: dto.id_user,
                total_harga: dto.total_harga,
                status: 'Sudah Dibayar',
            },
        });
    }
    async updateStatus(id, status) {
        const transaksi = await this.prisma.transaksi.findUnique({
            where: { id_transaksi: id },
        });
        if (!transaksi) {
            throw new common_1.NotFoundException('Transaksi tidak ditemukan');
        }
        return this.prisma.transaksi.update({
            where: { id_transaksi: id },
            data: { status },
        });
    }
};
exports.TransaksiService = TransaksiService;
exports.TransaksiService = TransaksiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TransaksiService);
//# sourceMappingURL=transaksi.service.js.map