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
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var EventType;
(function (EventType) {
    EventType["click"] = "click";
    EventType["purchase"] = "purchase";
    EventType["video_complete"] = "video_complete";
})(EventType || (EventType = {}));
class UserInfoDto {
    ip;
    userAgent;
    referer;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1.2.3.4', description: 'IP 주소' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserInfoDto.prototype, "ip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Mozilla/5.0 ...',
        description: '브라우저 User Agent',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserInfoDto.prototype, "userAgent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://...', description: '유입 경로' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserInfoDto.prototype, "referer", void 0);
class TrackEventDto {
    trackingId;
    eventType;
    userInfo;
    extra;
}
exports.TrackEventDto = TrackEventDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '8f3e9c1d-c3b0-4b3a-8e1e-2b0a1b3c4d5e', description: '트래킹 ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], TrackEventDto.prototype, "trackingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: EventType, example: 'purchase', description: '이벤트 타입' }),
    (0, class_validator_1.IsEnum)(EventType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], TrackEventDto.prototype, "eventType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사용자 정보' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => UserInfoDto),
    __metadata("design:type", UserInfoDto)
], TrackEventDto.prototype, "userInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { orderId: 'ORD1234', amount: 25000 },
        description: '기타 추가 정보 (JSON)',
        required: false,
    }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], TrackEventDto.prototype, "extra", void 0);
//# sourceMappingURL=track-event.dto.js.map