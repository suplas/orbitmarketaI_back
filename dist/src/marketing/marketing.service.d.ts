import { PrismaService } from 'src/prisma/prisma.service';
import { TrackingUrlDto } from './dto/tracking-url.dto';
import { ProductListItemDto } from './dto/product-list-item.dto';
import { ProductDetailDto } from './dto/product-detail.dto';
import { TrackEventDto } from './dto/track-event.dto';
import { StatsDto } from './dto/stats.dto';
export declare class MarketingService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getProducts(search?: string, category?: string, sort?: string): Promise<ProductListItemDto[]>;
    getProductById(id: number): Promise<ProductDetailDto>;
    startPromotion(productId: number, userId: number): Promise<TrackingUrlDto>;
    trackEvent(trackEventDto: TrackEventDto): Promise<{
        success: boolean;
    }>;
    getStats(userId: number): Promise<StatsDto[]>;
}
