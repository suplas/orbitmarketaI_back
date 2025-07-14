import { Controller, Get, Param, Redirect } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { TrackingService } from './tracking.service';

@ApiExcludeController()
@Controller('t')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Get(':trackingId')
  @Redirect()
  async handleRedirect(@Param('trackingId') trackingId: string) {
    console.log(`Tracking ID: ${trackingId} clicked.`);
    const targetUrl = await this.trackingService.getRedirectUrl(trackingId);
    return { url: targetUrl, statusCode: 302 };
  }
} 