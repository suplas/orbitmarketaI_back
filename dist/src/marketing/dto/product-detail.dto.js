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
exports.ProductDetailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ProductDetailDto {
    id;
    name;
    description;
    price;
    reward;
    rewardRate;
    sellerName;
    imageUrl;
    category;
}
exports.ProductDetailDto = ProductDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 123, description: '상품 고유 ID' }),
    __metadata("design:type", Number)
], ProductDetailDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '친환경 텀블러', description: '상품명' }),
    __metadata("design:type", String)
], ProductDetailDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '지구를 생각하는 친환경 텀블러입니다. 스테인리스 스틸로 만들어져...',
        description: '상품 상세 설명',
    }),
    __metadata("design:type", Object)
], ProductDetailDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25000, description: '상품 가격 (원)' }),
    __metadata("design:type", Object)
], ProductDetailDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5000, description: '홍보 리워드 (원)' }),
    __metadata("design:type", Object)
], ProductDetailDto.prototype, "reward", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 20, description: '리워드 지급률 (%)' }),
    __metadata("design:type", Object)
], ProductDetailDto.prototype, "rewardRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'EcoLife', description: '판매자 이름' }),
    __metadata("design:type", Object)
], ProductDetailDto.prototype, "sellerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://example.com/images/tumbler.jpg',
        description: '상품 대표 이미지 URL',
    }),
    __metadata("design:type", Object)
], ProductDetailDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '생활용품', description: '카테고리' }),
    __metadata("design:type", Object)
], ProductDetailDto.prototype, "category", void 0);
//# sourceMappingURL=product-detail.dto.js.map