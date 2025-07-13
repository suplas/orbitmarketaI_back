import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarketingModule } from './marketing/marketing.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [MarketingModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
