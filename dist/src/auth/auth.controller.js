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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const local_auth_guard_1 = require("./local-auth.guard");
const login_dto_1 = require("./dto/login.dto");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
let AuthController = class AuthController {
    authService;
    configService;
    constructor(authService, configService) {
        this.authService = authService;
        this.configService = configService;
    }
    socialLoginRedirect(user, res) {
        const { access_token } = this.authService.login(user);
        const frontendUrl = this.configService.getOrThrow('FRONTEND_URL');
        res.redirect(`${frontendUrl}/#access_token=${access_token}`);
    }
    login(req) {
        return this.authService.login(req.user);
    }
    googleAuth() {
    }
    googleAuthRedirect(req, res) {
        return this.socialLoginRedirect(req.user, res);
    }
    kakaoAuth() {
    }
    kakaoAuthRedirect(req, res) {
        return this.socialLoginRedirect(req.user, res);
    }
    naverAuth() {
    }
    naverAuthRedirect(req, res) {
        return this.socialLoginRedirect(req.user, res);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: '사용자 로그인' }),
    (0, swagger_1.ApiBody)({ type: login_dto_1.LoginDto }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('google'),
    (0, swagger_1.ApiOperation)({ summary: 'Google 소셜 로그인 시작' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, swagger_1.ApiOperation)({ summary: 'Google 소셜 로그인 콜백' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "googleAuthRedirect", null);
__decorate([
    (0, common_1.Get)('kakao'),
    (0, swagger_1.ApiOperation)({ summary: 'Kakao 소셜 로그인 시작' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('kakao')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "kakaoAuth", null);
__decorate([
    (0, common_1.Get)('kakao/callback'),
    (0, swagger_1.ApiOperation)({ summary: 'Kakao 소셜 로그인 콜백' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('kakao')),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "kakaoAuthRedirect", null);
__decorate([
    (0, common_1.Get)('naver'),
    (0, swagger_1.ApiOperation)({ summary: 'Naver 소셜 로그인 시작' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('naver')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "naverAuth", null);
__decorate([
    (0, common_1.Get)('naver/callback'),
    (0, swagger_1.ApiOperation)({ summary: 'Naver 소셜 로그인 콜백' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('naver')),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "naverAuthRedirect", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('인증'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        config_1.ConfigService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map