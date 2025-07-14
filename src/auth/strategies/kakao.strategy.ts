import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-kakao';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

interface IKakaoProfile {
  id: number;
  connected_at: string;
  kakao_account?: {
    profile_needs_agreement?: boolean;
    profile?: {
      nickname?: string;
      thumbnail_image_url?: string;
      profile_image_url?: string;
      is_default_image?: boolean;
    };
    email_needs_agreement?: boolean;
    is_email_valid?: boolean;
    is_email_verified?: boolean;
    email?: string;
  };
}

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.getOrThrow<string>('KAKAO_CLIENT_ID'),
      callbackURL: configService.getOrThrow<string>('KAKAO_CALLBACK_URL'),
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void,
  ): Promise<any> {
    const id = profile.id;
    const username = profile.username;
    const kakaoProfile = profile._json as IKakaoProfile;
    const email = kakaoProfile.kakao_account?.email;

    if (!email) {
      return done(
        new UnauthorizedException('카카오 계정에 이메일 정보가 없습니다.'),
        false,
      );
    }

    const user = await this.authService.validateSocialUser({
      email,
      displayName: username || email.split('@')[0],
      snsId: id.toString(),
      platform: 'kakao',
      profileImage:
        kakaoProfile.kakao_account?.profile?.profile_image_url || null,
    });

    done(null, user);
  }
} 