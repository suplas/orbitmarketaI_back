import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { TrackingUrlDto } from './dto/tracking-url.dto';
import { ProductListItemDto } from './dto/product-list-item.dto';
import { ProductDetailDto } from './dto/product-detail.dto';
import { Prisma, ProductStatus } from '@prisma/client';
import { TrackEventDto } from './dto/track-event.dto';
import { StatsDto } from './dto/stats.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MarketingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async getProducts(
    search?: string,
    category?: string,
    sort?: string,
  ): Promise<ProductListItemDto[]> {
    const where: Prisma.ProductWhereInput = {
      status: ProductStatus.active,
    };
    if (search) {
      where.name = { contains: search };
    }
    if (category) {
      where.category = { equals: category };
    }

    const orderBy: Prisma.ProductOrderByWithRelationInput = {};
    if (sort === 'reward') {
      orderBy.reward = 'desc';
    } else {
      orderBy.createdAt = 'desc'; // Default sort
    }

    const products = await this.prisma.product.findMany({
      where,
      orderBy,
      include: {
        _count: {
          select: { promotions: true },
        },
      },
    });

    return products.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      reward: p.reward,
      rewardRate: p.rewardRate,
      promoterCount: p._count.promotions,
      imageUrl: p.imageUrl,
    }));
  }

  async getProductById(id: number): Promise<ProductDetailDto> {
    const product = await this.prisma.product.findFirst({
      where: { id: id, status: ProductStatus.active },
      include: {
        seller: true, // 'seller' relation must be defined in schema
      },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      reward: product.reward,
      rewardRate: product.rewardRate,
      sellerName: product.seller.name,
      imageUrl: product.imageUrl,
      category: product.category,
    };
  }

  async startPromotion(
    productId: number,
    userId: number,
  ): Promise<TrackingUrlDto> {
    const trackingId = uuidv4();

    await this.prisma.promotion.create({
      data: {
        productId: productId,
        userId: userId,
        trackingId: trackingId,
      },
    });

    const baseUrl = this.configService.getOrThrow<string>('BASE_URL');
    const trackingUrl = `${baseUrl}/t/${trackingId}`;

    return { trackingUrl };
  }

  async trackEvent(trackEventDto: TrackEventDto): Promise<{ success: boolean }> {
    const { trackingId, eventType, userInfo, extra } = trackEventDto;

    const promotion = await this.prisma.promotion.findUnique({
      where: { trackingId: trackingId },
    });

    if (!promotion) {
      throw new NotFoundException(
        `Promotion with tracking ID ${trackingId} not found`,
      );
    }

    await this.prisma.promotionEvent.create({
      data: {
        promotionId: promotion.id,
        eventType: eventType,
        ipAddress: userInfo.ip,
        userAgent: userInfo.userAgent,
        referrer: userInfo.referer,
        etcData: extra || {},
      },
    });

    return { success: true };
  }

  async getStats(userId: number): Promise<StatsDto[]> {
    const promotions = await this.prisma.promotion.findMany({
      where: { userId: userId },
      include: {
        product: true,
        _count: {
          select: {
            events: {
              where: { eventType: 'click' },
            },
          },
        },
      },
    });

    const purchaseCounts = await this.prisma.promotionEvent.groupBy({
      by: ['promotionId'],
      where: {
        promotion: { userId: userId },
        eventType: 'purchase',
      },
      _count: true,
    });

    const purchaseMap = new Map(
      purchaseCounts.map((p) => [p.promotionId, p._count]),
    );

    return promotions.map((p) => {
      const purchases = purchaseMap.get(p.id) || 0;
      const expectedReward = (p.product.reward || 0) * purchases;

      return {
        productId: p.productId,
        productName: p.product.name,
        clicks: p._count.events,
        purchases: purchases,
        expectedReward: expectedReward,
      };
    });
  }
}
