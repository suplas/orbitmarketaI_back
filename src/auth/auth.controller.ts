import { Controller, Get, Post, UseGuards, Request, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  private socialLoginRedirect(
    user: Omit<User, 'password'>,
    res: Response,
  ): void {
    const { access_token } = this.authService.login(user);
    const frontendUrl = this.configService.getOrThrow<string>('FRONTEND_URL');
    res.redirect(`${frontendUrl}/#access_token=${access_token}`);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: '사용자 로그인' })
  @ApiBody({ type: LoginDto })
  login(@Request() req: { user: Omit<User, 'password'> }) {
    return this.authService.login(req.user);
  }

  @Get('google')
  @ApiOperation({ summary: 'Google 소셜 로그인 시작' })
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    // Passport가 Google 로그인 페이지로 리디렉션하므로, 이 함수의 내용은 실행되지 않습니다.
  }

  @Get('google/callback')
  @ApiOperation({ summary: 'Google 소셜 로그인 콜백' })
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(
    @Request() req: { user: Omit<User, 'password'> },
    @Res() res: Response,
  ) {
    return this.socialLoginRedirect(req.user, res);
  }

  @Get('kakao')
  @ApiOperation({ summary: 'Kakao 소셜 로그인 시작' })
  @UseGuards(AuthGuard('kakao'))
  kakaoAuth() {
    // Passport가 Kakao 로그인 페이지로 리디렉션하므로, 이 함수의 내용은 실행되지 않습니다.
  }

  @Get('kakao/callback')
  @ApiOperation({ summary: 'Kakao 소셜 로그인 콜백' })
  @UseGuards(AuthGuard('kakao'))
  kakaoAuthRedirect(
    @Request() req: { user: Omit<User, 'password'> },
    @Res() res: Response,
  ) {
    return this.socialLoginRedirect(req.user, res);
  }

  @Get('naver')
  @ApiOperation({ summary: 'Naver 소셜 로그인 시작' })
  @UseGuards(AuthGuard('naver'))
  naverAuth() {
    // Passport가 Naver 로그인 페이지로 리디렉션하므로, 이 함수의 내용은 실행되지 않습니다.
  }

  @Get('naver/callback')
  @ApiOperation({ summary: 'Naver 소셜 로그인 콜백' })
  @UseGuards(AuthGuard('naver'))
  naverAuthRedirect(
    @Request() req: { user: Omit<User, 'password'> },
    @Res() res: Response,
  ) {
    return this.socialLoginRedirect(req.user, res);
  }
}
