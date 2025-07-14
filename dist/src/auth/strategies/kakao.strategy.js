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
exports.KakaoStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_kakao_1 = require("passport-kakao");
const config_1 = require("@nestjs/config");
const auth_service_1 = require("../auth.service");
let KakaoStrategy = class KakaoStrategy extends (0, passport_1.PassportStrategy)(passport_kakao_1.Strategy, 'kakao') {
    configService;
    authService;
    constructor(configService, authService) {
        super({
            clientID: configService.getOrThrow('KAKAO_CLIENT_ID'),
            callbackURL: configService.getOrThrow('KAKAO_CALLBACK_URL'),
        });
        this.configService = configService;
        this.authService = authService;
    }
    async validate(accessToken, refreshToken, profile, done) {
        const id = profile.id;
        const username = profile.username;
        const kakaoProfile = profile._json;
        const email = kakaoProfile.kakao_account?.email;
        if (!email) {
            return done(new common_1.UnauthorizedException('카카오 계정에 이메일 정보가 없습니다.'), false);
        }
        const user = await this.authService.validateSocialUser({
            email,
            displayName: username || email.split('@')[0],
            snsId: id.toString(),
            platform: 'kakao',
            profileImage: kakaoProfile.kakao_account?.profile?.profile_image_url || null,
        });
        done(null, user);
    }
};
exports.KakaoStrategy = KakaoStrategy;
exports.KakaoStrategy = KakaoStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        auth_service_1.AuthService])
], KakaoStrategy);
//# sourceMappingURL=kakao.strategy.js.map