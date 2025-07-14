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
exports.TrackingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tracking_service_1 = require("./tracking.service");
let TrackingController = class TrackingController {
    trackingService;
    constructor(trackingService) {
        this.trackingService = trackingService;
    }
    async handleRedirect(trackingId) {
        console.log(`Tracking ID: ${trackingId} clicked.`);
        const targetUrl = await this.trackingService.getRedirectUrl(trackingId);
        return { url: targetUrl, statusCode: 302 };
    }
};
exports.TrackingController = TrackingController;
__decorate([
    (0, common_1.Get)(':trackingId'),
    (0, common_1.Redirect)(),
    __param(0, (0, common_1.Param)('trackingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrackingController.prototype, "handleRedirect", null);
exports.TrackingController = TrackingController = __decorate([
    (0, swagger_1.ApiExcludeController)(),
    (0, common_1.Controller)('t'),
    __metadata("design:paramtypes", [tracking_service_1.TrackingService])
], TrackingController);
//# sourceMappingURL=tracking.controller.js.map