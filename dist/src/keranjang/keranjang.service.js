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
exports.KeranjangService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let KeranjangService = class KeranjangService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByUser(id_user) {
        return this.prisma.keranjang.findMany({
            where: { id_user },
            include: { event: true },
        });
    }
    async create(dto) {
        return this.prisma.keranjang.create({
            data: {
                id_user: dto.id_user,
                id_event: dto.id_event,
                status: 'Pending',
            },
        });
    }
    async remove(id) {
        const item = await this.prisma.keranjang.findUnique({
            where: { id_keranjang: id },
        });
        if (!item) {
            throw new common_1.NotFoundException('Item keranjang tidak ditemukan');
        }
        return this.prisma.keranjang.delete({
            where: { id_keranjang: id },
        });
    }
};
exports.KeranjangService = KeranjangService;
exports.KeranjangService = KeranjangService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], KeranjangService);
//# sourceMappingURL=keranjang.service.js.map