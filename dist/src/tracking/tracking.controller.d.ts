import { TrackingService } from './tracking.service';
export declare class TrackingController {
    private readonly trackingService;
    constructor(trackingService: TrackingService);
    handleRedirect(trackingId: string): Promise<{
        url: string;
        statusCode: number;
    }>;
}
