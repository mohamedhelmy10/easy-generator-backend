import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Secure@123',
    description:
      'User password (min 8 characters, including letters, numbers, and special characters)',
  })
  @IsNotEmpty()
  password: string;
}
