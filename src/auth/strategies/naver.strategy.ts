import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
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

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.getOrThrow<string>('NAVER_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>('NAVER_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow<string>('NAVER_CALLBACK_URL'),
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: NaverProfile & { _json: INaverProfile },
    done: (error: any, user?: any, info?: any) => void,
  ): Promise<any> {
    const { id, email, nickname, profile_image, mobile } = profile._json.response;

    if (!email) {
      return done(
        new UnauthorizedException('네이버 계정에 이메일 정보가 없습니다.'),
        false,
      );
    }

    const user = await this.authService.validateSocialUser({
      email,
      displayName: nickname || email.split('@')[0],
      snsId: id,
      platform: 'naver',
      phoneNumber: mobile || null,
      profileImage: profile_image || null,
    });

    done(null, user);
  }
}