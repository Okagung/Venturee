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
exports.KeranjangController = void 0;
const common_1 = require("@nestjs/common");
const keranjang_service_1 = require("./keranjang.service");
const create_keranjang_dto_1 = require("./dto/create-keranjang.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let KeranjangController = class KeranjangController {
    keranjangService;
    constructor(keranjangService) {
        this.keranjangService = keranjangService;
    }
    findByUser(id_user) {
        return this.keranjangService.findByUser(Number(id_user));
    }
    create(dto) {
        return this.keranjangService.create(dto);
    }
    remove(id) {
        return this.keranjangService.remove(Number(id));
    }
};
exports.KeranjangController = KeranjangController;
__decorate([
    (0, common_1.Get)(':id_user'),
    __param(0, (0, common_1.Param)('id_user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KeranjangController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_keranjang_dto_1.CreateKeranjangDto]),
    __metadata("design:returntype", void 0)
], KeranjangController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KeranjangController.prototype, "remove", null);
exports.KeranjangController = KeranjangController = __decorate([
    (0, common_1.Controller)('keranjang'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [keranjang_service_1.KeranjangService])
], KeranjangController);
//# sourceMappingURL=keranjang.controller.js.map