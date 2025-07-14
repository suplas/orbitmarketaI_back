import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class TrackingUrlDto {
  @ApiProperty({
    example: 'https://orbitmarket.ai/t/f8c3f3e6-a4f3-4b2a-8d7d-3b9e4b6b3e0c',
    description: '생성된 고유 트래킹 URL',
  })
  @IsUrl()
  trackingUrl: string;
} 