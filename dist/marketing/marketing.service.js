"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketingService = void 0;
const common_1 = require("@nestjs/common");
let MarketingService = class MarketingService {
    getProducts(search, category, sort) {
        console.log({ search, category, sort });
        return [
            {
                id: 123,
                name: '친환경 텀블러',
                category: '생활용품',
                reward: 5000,
                reward_rate: 20,
                promoter_count: 128,
                image_url: 'https://...jpg',
            },
        ];
    }
    getProductById(productId) {
        return {
            id: productId,
            name: '친환경 텀블러',
            description: '지구를 생각하는 친환경 텀블러입니다.',
            price: 25000,
            reward: 5000,
            reward_rate: 20,
            seller: 'EcoLife',
            image_url: 'https://...jpg',
            category: '생활용품',
        };
    }
    createTrackingLink(promoteDto) {
        console.log(promoteDto);
        return {
            trackingUrl: 'https://myservice.com/t/8f3e9c1d',
        };
    }
    trackEvent(trackEventDto) {
        console.log(trackEventDto);
        return { success: true };
    }
    getStats(userId) {
        return [
            {
                productId: 123,
                productName: '친환경 텀블러',
                clicks: 120,
                purchases: 5,
                expectedReward: 25000,
                userId,
            },
        ];
    }
};
exports.MarketingService = MarketingService;
exports.MarketingService = MarketingService = __decorate([
    (0, common_1.Injectable)()
], MarketingService);
//# sourceMappingURL=marketing.service.js.map