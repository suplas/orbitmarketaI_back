import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class PromoteDto {
  @ApiProperty({
    example: 123,
    description: '홍보를 시작할 상품의 고유 ID',
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  productId: number;
} 