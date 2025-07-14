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
exports.MarketingController = void 0;
const common_1 = require("@nestjs/common");
const marketing_service_1 = require("./marketing.service");
const swagger_1 = require("@nestjs/swagger");
const promote_dto_1 = require("./dto/promote.dto");
const tracking_url_dto_1 = require("./dto/tracking-url.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const product_list_item_dto_1 = require("./dto/product-list-item.dto");
const product_detail_dto_1 = require("./dto/product-detail.dto");
const track_event_dto_1 = require("./dto/track-event.dto");
const stats_dto_1 = require("./dto/stats.dto");
let MarketingController = class MarketingController {
    marketingService;
    constructor(marketingService) {
        this.marketingService = marketingService;
    }
    getProducts(search, category, sort) {
        return this.marketingService.getProducts(search, category, sort);
    }
    getProductById(productId) {
        return this.marketingService.getProductById(productId);
    }
    promote(promoteDto, req) {
        const { userId } = req.user;
        const { productId } = promoteDto;
        return this.marketingService.startPromotion(productId, userId);
    }
    trackEvent(trackEventDto) {
        return this.marketingService.trackEvent(trackEventDto);
    }
    getStats(req) {
        return this.marketingService.getStats(req.user.userId);
    }
};
exports.MarketingController = MarketingController;
__decorate([
    (0, common_1.Get)('products'),
    (0, swagger_1.ApiOperation)({ summary: '마케팅용 상품 리스트 조회' }),
    (0, swagger_1.ApiOkResponse)({
        description: '홍보 가능한 상품 리스트를 반환합니다.',
        type: [product_list_item_dto_1.ProductListItemDto],
    }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'sort', required: false, type: String }),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('category')),
    __param(2, (0, common_1.Query)('sort')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], MarketingController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Get)('products/:productId'),
    (0, swagger_1.ApiOperation)({ summary: '상품 상세 정보 조회' }),
    (0, swagger_1.ApiOkResponse)({
        description: '상품의 상세 정보를 반환합니다.',
        type: product_detail_dto_1.ProductDetailDto,
    }),
    (0, swagger_1.ApiParam)({ name: 'productId', type: 'number' }),
    __param(0, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MarketingController.prototype, "getProductById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('promote'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: '홍보 시작 (트래킹 링크 발급)',
        description: '선택한 상품에 대한 트래킹 링크를 생성하여 반환합니다.',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: '생성된 트래킹 URL',
        type: tracking_url_dto_1.TrackingUrlDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [promote_dto_1.PromoteDto, Object]),
    __metadata("design:returntype", Promise)
], MarketingController.prototype, "promote", null);
__decorate([
    (0, common_1.Post)('track-event'),
    (0, swagger_1.ApiOperation)({
        summary: '트래킹 이벤트 수집',
        description: '구매, 영상완료 등 추가적인 사용자 행동 이벤트를 기록합니다.',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: '이벤트가 성공적으로 기록됨',
        schema: { example: { success: true } },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [track_event_dto_1.TrackEventDto]),
    __metadata("design:returntype", Promise)
], MarketingController.prototype, "trackEvent", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: '홍보 실적/통계 조회',
        description: '로그인한 사용자의 홍보 실적(클릭, 구매, 예상 리워드)을 조회합니다.',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: '사용자의 홍보 실적 통계',
        type: [stats_dto_1.StatsDto],
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MarketingController.prototype, "getStats", null);
exports.MarketingController = MarketingController = __decorate([
    (0, swagger_1.ApiTags)('마케팅'),
    (0, common_1.Controller)('marketing'),
    __metadata("design:paramtypes", [marketing_service_1.MarketingService])
], MarketingController);
//# sourceMappingURL=marketing.controller.js.map