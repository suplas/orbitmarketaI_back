import { ApiProperty } from '@nestjs/swagger';

export class ProductDetailDto {
  @ApiProperty({ example: 123, description: '상품 고유 ID' })
  id: number;

  @ApiProperty({ example: '친환경 텀블러', description: '상품명' })
  name: string;

  @ApiProperty({
    example: '지구를 생각하는 친환경 텀블러입니다. 스테인리스 스틸로 만들어져...',
    description: '상품 상세 설명',
  })
  description: string | null;

  @ApiProperty({ example: 25000, description: '상품 가격 (원)' })
  price: number | null;

  @ApiProperty({ example: 5000, description: '홍보 리워드 (원)' })
  reward: number | null;

  @ApiProperty({ example: 20, description: '리워드 지급률 (%)' })
  rewardRate: number | null;

  @ApiProperty({ example: 'EcoLife', description: '판매자 이름' })
  sellerName: string | null;

  @ApiProperty({
    example: 'https://example.com/images/tumbler.jpg',
    description: '상품 대표 이미지 URL',
  })
  imageUrl: string | null;

  @ApiProperty({ example: '생활용품', description: '카테고리' })
  category: string | null;
} 