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
exports.TrackingUrlDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class TrackingUrlDto {
    trackingUrl;
}
exports.TrackingUrlDto = TrackingUrlDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://orbitmarket.ai/t/f8c3f3e6-a4f3-4b2a-8d7d-3b9e4b6b3e0c',
        description: '생성된 고유 트래킹 URL',
    }),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], TrackingUrlDto.prototype, "trackingUrl", void 0);
//# sourceMappingURL=tracking-url.dto.js.map