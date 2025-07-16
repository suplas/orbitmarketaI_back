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
exports.NaverStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_naver_v2_1 = require("passport-naver-v2");
const config_1 = require("@nestjs/config");
const auth_service_1 = require("../auth.service");
let NaverStrategy = class NaverStrategy extends (0, passport_1.PassportStrategy)(passport_naver_v2_1.Strategy, 'naver') {
    configService;
    authService;
    constructor(configService, authService) {
        super({
            clientID: configService.getOrThrow('NAVER_CLIENT_ID'),
            clientSecret: configService.getOrThrow('NAVER_CLIENT_SECRET'),
            callbackURL: configService.getOrThrow('NAVER_CALLBACK_URL'),
        });
        this.configService = configService;
        this.authService = authService;
    }
    async validate(accessToken, refreshToken, profile, done) {
        const { id, email, nickname, profile_image } = profile._json.response;
        if (!email) {
            return done(new common_1.UnauthorizedException('네이버 계정에 이메일 정보가 없습니다.'), false);
        }
        const user = await this.authService.validateSocialUser({
            email,
            displayName: nickname || email.split('@')[0],
            snsId: id,
            platform: 'naver',
            profileImage: profile_image || null,
        });
        done(null, user);
    }
};
exports.NaverStrategy = NaverStrategy;
exports.NaverStrategy = NaverStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        auth_service_1.AuthService])
], NaverStrategy);
//# sourceMappingURL=naver.strategy.js.map