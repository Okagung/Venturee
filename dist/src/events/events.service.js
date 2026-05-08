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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let EventsService = class EventsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.event.findMany();
    }
    async findOne(id) {
        const event = await this.prisma.event.findUnique({
            where: { id_event: id },
        });
        if (!event) {
            throw new common_1.NotFoundException('Event tidak ditemukan');
        }
        return event;
    }
    async create(dto) {
        return this.prisma.event.create({
            data: {
                nama_event: dto.nama_event,
                deskripsi_event: dto.deskripsi_event,
                harga_event: dto.harga_event,
                kuota: dto.kuota,
            },
        });
    }
    async update(id, dto) {
        return this.prisma.event.update({
            where: { id_event: id },
            data: {
                nama_event: dto.nama_event,
                deskripsi_event: dto.deskripsi_event,
                harga_event: dto.harga_event,
                kuota: dto.kuota,
            },
        });
    }
    async remove(id) {
        return this.prisma.event.delete({
            where: { id_event: id },
        });
    }
    async search(keyword) {
        return this.prisma.event.findMany({
            where: {
                nama_event: {
                    contains: keyword,
                    mode: 'insensitive',
                },
            },
        });
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EventsService);
//# sourceMappingURL=events.service.js.map