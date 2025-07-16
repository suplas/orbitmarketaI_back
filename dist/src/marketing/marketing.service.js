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
exports.MarketingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const uuid_1 = require("uuid");
const client_1 = require("@prisma/client");
const config_1 = require("@nestjs/config");
let MarketingService = class MarketingService {
    prisma;
    configService;
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
    }
    async getProducts(search, category, sort) {
        const where = {
            status: client_1.ProductStatus.active,
        };
        if (search) {
            where.name = { contains: search };
        }
        if (category) {
            where.category = { equals: category };
        }
        const orderBy = {};
        if (sort === 'reward') {
            orderBy.reward = 'desc';
        }
        else {
            orderBy.createdAt = 'desc';
        }
        const products = await this.prisma.product.findMany({
            where,
            orderBy,
            include: {
                _count: {
                    select: { promotions: true },
                },
            },
        });
        return products.map((p) => ({
            id: p.id,
            name: p.name,
            category: p.category,
            reward: p.reward,
            rewardRate: p.rewardRate,
            promoterCount: p._count.promotions,
            imageUrl: p.imageUrl,
        }));
    }
    async getProductById(id) {
        const product = await this.prisma.product.findFirst({
            where: { id: id, status: client_1.ProductStatus.active },
            include: {
                seller: true,
            },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            reward: product.reward,
            rewardRate: product.rewardRate,
            sellerName: product.seller.name,
            imageUrl: product.imageUrl,
            category: product.category,
        };
    }
    async startPromotion(productId, userId) {
        const trackingId = (0, uuid_1.v4)();
        await this.prisma.promotion.create({
            data: {
                productId: productId,
                userId: userId,
                trackingId: trackingId,
            },
        });
        const baseUrl = this.configService.getOrThrow('BASE_URL');
        const trackingUrl = `${baseUrl}/t/${trackingId}`;
        return { trackingUrl };
    }
    async trackEvent(trackEventDto) {
        const { trackingId, eventType, userInfo, extra } = trackEventDto;
        const promotion = await this.prisma.promotion.findUnique({
            where: { trackingId: trackingId },
        });
        if (!promotion) {
            throw new common_1.NotFoundException(`Promotion with tracking ID ${trackingId} not found`);
        }
        await this.prisma.promotionEvent.create({
            data: {
                promotionId: promotion.id,
                eventType: eventType,
                ipAddress: userInfo.ip,
                userAgent: userInfo.userAgent,
                referrer: userInfo.referer,
                etcData: extra || {},
            },
        });
        return { success: true };
    }
    async getStats(userId) {
        const promotions = await this.prisma.promotion.findMany({
            where: { userId: userId },
            include: {
                product: true,
                _count: {
                    select: {
                        events: {
                            where: { eventType: 'click' },
                        },
                    },
                },
            },
        });
        const purchaseCounts = await this.prisma.promotionEvent.groupBy({
            by: ['promotionId'],
            where: {
                promotion: { userId: userId },
                eventType: 'purchase',
            },
            _count: true,
        });
        const purchaseMap = new Map(purchaseCounts.map((p) => [p.promotionId, p._count]));
        return promotions.map((p) => {
            const purchases = purchaseMap.get(p.id) || 0;
            const expectedReward = (p.product.reward || 0) * purchases;
            return {
                productId: p.productId,
                productName: p.product.name,
                clicks: p._count.events,
                purchases: purchases,
                expectedReward: expectedReward,
            };
        });
    }
};
exports.MarketingService = MarketingService;
exports.MarketingService = MarketingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], MarketingService);
//# sourceMappingURL=marketing.service.js.map