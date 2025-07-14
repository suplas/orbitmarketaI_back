import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackingService {
  constructor(private readonly prisma: PrismaService) {}

  async getRedirectUrl(trackingId: string): Promise<string> {
    const promotion = await this.prisma.promotion.findUnique({
      where: { trackingId: trackingId },
      include: {
        product: true,
      },
    });

    if (!promotion) {
      throw new NotFoundException('Promotion not found');
    }

    // DBERP.md에 따르면 product 테이블에는 외부 링크 URL이 없습니다. 
    // 우선순위: 1. 홍보 채널에 등록된 URL (향후 추가될 수 있음) 2. 상품 이미지 URL 3. 기본 URL
    const targetUrl =
      promotion.product.imageUrl || 'https://orbitmarket.ai/default-product';

    // 클릭 이벤트 기록 (비동기로 처리하여 리디렉션이 지연되지 않도록 함)
    this.recordClickEvent(promotion.id).catch((err) => {
      // 에러 로깅
      console.error('Failed to record click event', err);
    });

    return targetUrl;
  }

  private async recordClickEvent(promotionId: number): Promise<void> {
    // TODO: IP, User-Agent, Referer 등 추가 정보 수집 로직 필요
    await this.prisma.promotionEvent.create({
      data: {
        promotionId: promotionId,
        eventType: 'click',
        // ip_address: ...,
        // user_agent: ...,
        // referrer: ...,
      },
    });
  }
} 