import { ApiProperty } from '@nestjs/swagger';

class UserInfo {
  @ApiProperty({ example: '1.2.3.4' })
  ip: string;

  @ApiProperty({ example: 'Mozilla/5.0...' })
  userAgent: string;

  @ApiProperty({ example: 'https://...' })
  referer: string;
}

class ExtraInfo {
  @ApiProperty({ example: 'ORD1234' })
  orderId: string;
}

export class TrackEventDto {
  @ApiProperty({ example: '8f3e9c1d' })
  trackingId: string;

  @ApiProperty({ example: 'purchase' })
  eventType: string;

  @ApiProperty()
  userInfo: UserInfo;

  @ApiProperty()
  extra: ExtraInfo;
} 