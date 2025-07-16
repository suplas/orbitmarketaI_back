import { Strategy, Profile as NaverProfile } from 'passport-naver-v2';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
interface INaverProfile {
    resultcode: string;
    message: string;
    response: {
        id: string;
        email: string;
        nickname: string;
        profile_image: string;
        age: string;
        gender: string;
        name: string;
        birthday: string;
        birthyear: string;
        mobile: string;
    };
}
declare const NaverStrategy_base: new (options: Partial<import("passport-oauth2").StrategyOptions>) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class NaverStrategy extends NaverStrategy_base {
    private readonly configService;
    private readonly authService;
    constructor(configService: ConfigService, authService: AuthService);
    validate(accessToken: string, refreshToken: string, profile: NaverProfile & {
        _json: INaverProfile;
    }, done: (error: any, user?: any, info?: any) => void): Promise<any>;
}
export {};
