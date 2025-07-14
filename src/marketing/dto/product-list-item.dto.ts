import { ApiProperty } from '@nestjs/swagger';

export class ProductListItemDto {
  @ApiProperty({ example: 123, description: '상품 고유 ID' })
  id: number;

  @ApiProperty({ example: '친환경 텀블러', description: '상품명' })
  name: string;

  @ApiProperty({ example: '생활용품', description: '카테고리' })
  category: string | null;

  @ApiProperty({ example: 5000, description: '홍보 리워드 (원)' })
  reward: number | null;

  @ApiProperty({ example: 20, description: '리워드 지급률 (%)' })
  rewardRate: number | null;

  @ApiProperty({ example: 128, description: '현재 상품을 홍보중인 인원 수' })
  promoterCount: number;

  @ApiProperty({
    example: 'https://example.com/images/tumbler.jpg',
    description: '상품 대표 이미지 URL',
  })
  imageUrl: string | null;
} 