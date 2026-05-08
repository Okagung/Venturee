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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransaksiController = void 0;
const common_1 = require("@nestjs/common");
const transaksi_service_1 = require("./transaksi.service");
const create_transaksi_dto_1 = require("./dto/create-transaksi.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let TransaksiController = class TransaksiController {
    transaksiService;
    constructor(transaksiService) {
        this.transaksiService = transaksiService;
    }
    findAll() {
        return this.transaksiService.findAll();
    }
    findByUser(id_user) {
        return this.transaksiService.findByUser(Number(id_user));
    }
    create(dto) {
        return this.transaksiService.create(dto);
    }
    updateStatus(id, status) {
        return this.transaksiService.updateStatus(Number(id), status);
    }
};
exports.TransaksiController = TransaksiController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TransaksiController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id_user'),
    __param(0, (0, common_1.Param)('id_user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TransaksiController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transaksi_dto_1.CreateTransaksiDto]),
    __metadata("design:returntype", void 0)
], TransaksiController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TransaksiController.prototype, "updateStatus", null);
exports.TransaksiController = TransaksiController = __decorate([
    (0, common_1.Controller)('transaksi'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [transaksi_service_1.TransaksiService])
], TransaksiController);
//# sourceMappingURL=transaksi.controller.js.map