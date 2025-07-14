import { MarketingService } from './marketing.service';
import { PromoteDto } from './dto/promote.dto';
import { TrackingUrlDto } from './dto/tracking-url.dto';
import { ProductListItemDto } from './dto/product-list-item.dto';
import { ProductDetailDto } from './dto/product-detail.dto';
import { TrackEventDto } from './dto/track-event.dto';
import { StatsDto } from './dto/stats.dto';
export declare class MarketingController {
    private readonly marketingService;
    constructor(marketingService: MarketingService);
    getProducts(search?: string, category?: string, sort?: string): Promise<ProductListItemDto[]>;
    getProductById(productId: number): Promise<ProductDetailDto>;
    promote(promoteDto: PromoteDto, req: {
        user: {
            userId: number;
        };
    }): Promise<TrackingUrlDto>;
    trackEvent(trackEventDto: TrackEventDto): Promise<{
        success: boolean;
    }>;
    getStats(req: {
        user: {
            userId: number;
        };
    }): Promise<StatsDto[]>;
}
