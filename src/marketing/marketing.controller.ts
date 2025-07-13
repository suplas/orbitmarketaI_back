import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { MarketingService } from './marketing.service';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { PromoteDto } from './dto/promote.dto';
import { TrackEventDto } from './dto/track-event.dto';

@ApiTags('Marketing')
@Controller('marketing')
export class MarketingController {
  constructor(private readonly marketingService: MarketingService) {}

  @Get('products')
  @ApiOperation({ summary: 'Get product list for marketing' })
  @ApiOkResponse({ description: 'List of products available for promotion.' })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiQuery({ name: 'sort', required: false, type: String })
  getProducts(
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('sort') sort?: string,
  ) {
    return this.marketingService.getProducts(search, category, sort);
  }

  @Get('products/:productId')
  @ApiOperation({ summary: 'Get product details' })
  @ApiOkResponse({ description: 'Detailed information about the product.' })
  @ApiParam({ name: 'productId', type: 'number' })
  getProductById(@Param('productId', ParseIntPipe) productId: number) {
    return this.marketingService.getProductById(productId);
  }

  @Post('promote')
  @ApiOperation({ summary: 'Start promotion and get a tracking link' })
  @ApiCreatedResponse({ description: 'Tracking link created successfully.' })
  createTrackingLink(@Body() promoteDto: PromoteDto) {
    return this.marketingService.createTrackingLink(promoteDto);
  }

  @Post('track-event')
  @ApiOperation({ summary: 'Collect a tracking event' })
  @ApiCreatedResponse({ description: 'Event tracked successfully.' })
  trackEvent(@Body() trackEventDto: TrackEventDto) {
    return this.marketingService.trackEvent(trackEventDto);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get promotion statistics' })
  @ApiOkResponse({ description: 'Statistics for the user.' })
  @ApiQuery({ name: 'userId', required: true, type: Number })
  getStats(@Query('userId', ParseIntPipe) userId: number) {
    return this.marketingService.getStats(userId);
  }
}
