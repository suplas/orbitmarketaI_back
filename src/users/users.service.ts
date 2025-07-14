import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByPlatformAndSnsId(platform: string, snsId: string) {
    // Prisma는 복합 키 필드를 직접 사용하여 조회합니다.
    return this.prisma.user.findUnique({
      where: {
        uniq_platform_snsid: {
          platform,
          snsId,
        },
      },
    });
  }

  async create(data: CreateUserDto) {
    const { password, ...restData } = data;
    let hashedPassword: string | null = null;

    if (password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    return this.prisma.user.create({
      data: {
        ...restData,
        password: hashedPassword,
      },
    });
  }
}
