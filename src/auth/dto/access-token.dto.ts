import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR...',
    description: 'JWT access token',
  })
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
