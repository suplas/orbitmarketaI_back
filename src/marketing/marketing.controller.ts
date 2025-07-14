import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { MarketingService } from './marketing.service';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { PromoteDto } from './dto/promote.dto';
import { TrackingUrlDto } from './dto/tracking-url.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductListItemDto } from './dto/product-list-item.dto';
import { ProductDetailDto } from './dto/product-detail.dto';
import { TrackEventDto } from './dto/track-event.dto';
import { StatsDto } from './dto/stats.dto';

@ApiTags('마케팅')
@Controller('marketing')
export class MarketingController {
  constructor(private readonly marketingService: MarketingService) {}

  @Get('products')
  @ApiOperation({ summary: '마케팅용 상품 리스트 조회' })
  @ApiOkResponse({
    description: '홍보 가능한 상품 리스트를 반환합니다.',
    type: [ProductListItemDto],
  })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiQuery({ name: 'sort', required: false, type: String })
  getProducts(
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('sort') sort?: string,
  ): Promise<ProductListItemDto[]> {
    return this.marketingService.getProducts(search, category, sort);
  }

  @Get('products/:productId')
  @ApiOperation({ summary: '상품 상세 정보 조회' })
  @ApiOkResponse({
    description: '상품의 상세 정보를 반환합니다.',
    type: ProductDetailDto,
  })
  @ApiParam({ name: 'productId', type: 'number' })
  getProductById(
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<ProductDetailDto> {
    return this.marketingService.getProductById(productId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('promote')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '홍보 시작 (트래킹 링크 발급)',
    description: '선택한 상품에 대한 트래킹 링크를 생성하여 반환합니다.',
  })
  @ApiOkResponse({
    description: '생성된 트래킹 URL',
    type: TrackingUrlDto,
  })
  promote(
    @Body() promoteDto: PromoteDto,
    @Request() req: { user: { userId: number } },
  ): Promise<TrackingUrlDto> {
    const { userId } = req.user;
    const { productId } = promoteDto;
    return this.marketingService.startPromotion(productId, userId);
  }

  @Post('track-event')
  @ApiOperation({
    summary: '트래킹 이벤트 수집',
    description: '구매, 영상완료 등 추가적인 사용자 행동 이벤트를 기록합니다.',
  })
  @ApiOkResponse({
    description: '이벤트가 성공적으로 기록됨',
    schema: { example: { success: true } },
  })
  trackEvent(@Body() trackEventDto: TrackEventDto): Promise<{ success: boolean }> {
    return this.marketingService.trackEvent(trackEventDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '홍보 실적/통계 조회',
    description: '로그인한 사용자의 홍보 실적(클릭, 구매, 예상 리워드)을 조회합니다.',
  })
  @ApiOkResponse({
    description: '사용자의 홍보 실적 통계',
    type: [StatsDto],
  })
  getStats(@Request() req: { user: { userId: number } }): Promise<StatsDto[]> {
    return this.marketingService.getStats(req.user.userId);
  }
}
