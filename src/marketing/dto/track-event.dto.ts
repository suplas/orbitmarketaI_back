import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

// Prisma 스키마와 일치하도록 Enum 정의
enum EventType {
  click = 'click',
  purchase = 'purchase',
  video_complete = 'video_complete',
}

class UserInfoDto {
  @ApiProperty({ example: '1.2.3.4', description: 'IP 주소' })
  @IsString()
  ip: string;

  @ApiProperty({
    example: 'Mozilla/5.0 ...',
    description: '브라우저 User Agent',
  })
  @IsString()
  userAgent: string;

  @ApiProperty({ example: 'https://...', description: '유입 경로' })
  @IsString()
  referer: string;
}

export class TrackEventDto {
  @ApiProperty({ example: '8f3e9c1d-c3b0-4b3a-8e1e-2b0a1b3c4d5e', description: '트래킹 ID' })
  @IsString()
  @IsNotEmpty()
  trackingId: string;

  @ApiProperty({ enum: EventType, example: 'purchase', description: '이벤트 타입' })
  @IsEnum(EventType)
  @IsNotEmpty()
  eventType: EventType;

  @ApiProperty({ description: '사용자 정보' })
  @IsObject()
  @ValidateNested()
  @Type(() => UserInfoDto)
  userInfo: UserInfoDto;

  @ApiProperty({
    example: { orderId: 'ORD1234', amount: 25000 },
    description: '기타 추가 정보 (JSON)',
    required: false,
  })
  @IsObject()
  extra?: Record<string, any>;
} 