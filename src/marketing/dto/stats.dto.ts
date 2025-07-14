import { ApiProperty } from '@nestjs/swagger';

export class StatsDto {
  @ApiProperty({ example: 123, description: '상품 고유 ID' })
  productId: number;

  @ApiProperty({ example: 'AI-Powered Smart Tumbler', description: '상품명' })
  productName: string;

  @ApiProperty({ example: 120, description: '총 클릭 수' })
  clicks: number;

  @ApiProperty({ example: 5, description: '총 구매 전환 수' })
  purchases: number;

  @ApiProperty({ example: 25000, description: '예상 리워드 (원)' })
  expectedReward: number;
} 