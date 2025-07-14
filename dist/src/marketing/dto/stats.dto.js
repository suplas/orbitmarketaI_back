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
exports.StatsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class StatsDto {
    productId;
    productName;
    clicks;
    purchases;
    expectedReward;
}
exports.StatsDto = StatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 123, description: '상품 고유 ID' }),
    __metadata("design:type", Number)
], StatsDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'AI-Powered Smart Tumbler', description: '상품명' }),
    __metadata("design:type", String)
], StatsDto.prototype, "productName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 120, description: '총 클릭 수' }),
    __metadata("design:type", Number)
], StatsDto.prototype, "clicks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, description: '총 구매 전환 수' }),
    __metadata("design:type", Number)
], StatsDto.prototype, "purchases", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25000, description: '예상 리워드 (원)' }),
    __metadata("design:type", Number)
], StatsDto.prototype, "expectedReward", void 0);
//# sourceMappingURL=stats.dto.js.map