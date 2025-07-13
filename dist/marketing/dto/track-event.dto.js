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
exports.TrackEventDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserInfo {
    ip;
    userAgent;
    referer;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1.2.3.4' }),
    __metadata("design:type", String)
], UserInfo.prototype, "ip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Mozilla/5.0...' }),
    __metadata("design:type", String)
], UserInfo.prototype, "userAgent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://...' }),
    __metadata("design:type", String)
], UserInfo.prototype, "referer", void 0);
class ExtraInfo {
    orderId;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ORD1234' }),
    __metadata("design:type", String)
], ExtraInfo.prototype, "orderId", void 0);
class TrackEventDto {
    trackingId;
    eventType;
    userInfo;
    extra;
}
exports.TrackEventDto = TrackEventDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '8f3e9c1d' }),
    __metadata("design:type", String)
], TrackEventDto.prototype, "trackingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'purchase' }),
    __metadata("design:type", String)
], TrackEventDto.prototype, "eventType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", UserInfo)
], TrackEventDto.prototype, "userInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", ExtraInfo)
], TrackEventDto.prototype, "extra", void 0);
//# sourceMappingURL=track-event.dto.js.map