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
const track_event_dto_1 = require("./dto/track-event.dto");
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
    createTrackingLink(promoteDto) {
        return this.marketingService.createTrackingLink(promoteDto);
    }
    trackEvent(trackEventDto) {
        return this.marketingService.trackEvent(trackEventDto);
    }
    getStats(userId) {
        return this.marketingService.getStats(userId);
    }
};
exports.MarketingController = MarketingController;
__decorate([
    (0, common_1.Get)('products'),
    (0, swagger_1.ApiOperation)({ summary: 'Get product list for marketing' }),
    (0, swagger_1.ApiOkResponse)({ description: 'List of products available for promotion.' }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'sort', required: false, type: String }),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('category')),
    __param(2, (0, common_1.Query)('sort')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], MarketingController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Get)('products/:productId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get product details' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Detailed information about the product.' }),
    (0, swagger_1.ApiParam)({ name: 'productId', type: 'number' }),
    __param(0, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MarketingController.prototype, "getProductById", null);
__decorate([
    (0, common_1.Post)('promote'),
    (0, swagger_1.ApiOperation)({ summary: 'Start promotion and get a tracking link' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Tracking link created successfully.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [promote_dto_1.PromoteDto]),
    __metadata("design:returntype", void 0)
], MarketingController.prototype, "createTrackingLink", null);
__decorate([
    (0, common_1.Post)('track-event'),
    (0, swagger_1.ApiOperation)({ summary: 'Collect a tracking event' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Event tracked successfully.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [track_event_dto_1.TrackEventDto]),
    __metadata("design:returntype", void 0)
], MarketingController.prototype, "trackEvent", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get promotion statistics' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Statistics for the user.' }),
    (0, swagger_1.ApiQuery)({ name: 'userId', required: true, type: Number }),
    __param(0, (0, common_1.Query)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MarketingController.prototype, "getStats", null);
exports.MarketingController = MarketingController = __decorate([
    (0, swagger_1.ApiTags)('Marketing'),
    (0, common_1.Controller)('marketing'),
    __metadata("design:paramtypes", [marketing_service_1.MarketingService])
], MarketingController);
//# sourceMappingURL=marketing.controller.js.map