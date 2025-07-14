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
exports.TrackingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TrackingService = class TrackingService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getRedirectUrl(trackingId) {
        const promotion = await this.prisma.promotion.findUnique({
            where: { trackingId: trackingId },
            include: {
                product: true,
            },
        });
        if (!promotion) {
            throw new common_1.NotFoundException('Promotion not found');
        }
        const targetUrl = promotion.product.imageUrl || 'https://orbitmarket.ai/default-product';
        this.recordClickEvent(promotion.id).catch((err) => {
            console.error('Failed to record click event', err);
        });
        return targetUrl;
    }
    async recordClickEvent(promotionId) {
        await this.prisma.promotionEvent.create({
            data: {
                promotionId: promotionId,
                eventType: 'click',
            },
        });
    }
};
exports.TrackingService = TrackingService;
exports.TrackingService = TrackingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TrackingService);
//# sourceMappingURL=tracking.service.js.map