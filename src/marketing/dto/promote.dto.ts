import { ApiProperty } from '@nestjs/swagger';

export class PromoteDto {
  @ApiProperty({
    example: 123,
    description: 'The ID of the product to be promoted',
  })
  productId: number;

  @ApiProperty({ example: 456, description: 'The ID of the user' })
  userId: number;
} 