import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    // 소셜 로그인 사용자는 password가 없을 수 있음
    if (user && user.password && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateSocialUser(data: {
    email: string;
    displayName: string;
    snsId: string;
    platform: string;
    profileImage?: string | null;
  }) {
    let user = await this.usersService.findByPlatformAndSnsId(
      data.platform,
      data.snsId,
    );

    if (user) {
      return user;
    }

    // 신규 소셜 유저 생성
    user = await this.usersService.create({
      email: data.email,
      name: data.displayName,
      platform: data.platform,
      snsId: data.snsId,
      profileImage: data.profileImage,
      // 소셜 로그인이므로 password는 null
    });

    return user;
  }

  login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
