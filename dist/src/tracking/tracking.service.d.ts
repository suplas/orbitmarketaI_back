import { PrismaService } from 'src/prisma/prisma.service';
export declare class TrackingService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getRedirectUrl(trackingId: string): Promise<string>;
    private recordClickEvent;
}
