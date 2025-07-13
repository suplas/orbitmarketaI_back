import { MarketingService } from './marketing.service';
import { PromoteDto } from './dto/promote.dto';
import { TrackEventDto } from './dto/track-event.dto';
export declare class MarketingController {
    private readonly marketingService;
    constructor(marketingService: MarketingService);
    getProducts(search?: string, category?: string, sort?: string): {
        id: number;
        name: string;
        category: string;
        reward: number;
        reward_rate: number;
        promoter_count: number;
        image_url: string;
    }[];
    getProductById(productId: number): {
        id: number;
        name: string;
        description: string;
        price: number;
        reward: number;
        reward_rate: number;
        seller: string;
        image_url: string;
        category: string;
    };
    createTrackingLink(promoteDto: PromoteDto): {
        trackingUrl: string;
    };
    trackEvent(trackEventDto: TrackEventDto): {
        success: boolean;
    };
    getStats(userId: number): {
        productId: number;
        productName: string;
        clicks: number;
        purchases: number;
        expectedReward: number;
        userId: number;
    }[];
}
