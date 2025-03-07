import { ApiProperty } from '@nestjs/swagger';
import { UserDocument } from '../schemas/user.schema';
import { Types } from 'mongoose';

export class UserResponseDto {
  @ApiProperty({ example: '65f0c8a5b3c9a3dcd7f5d9b1', description: 'User ID' })
  id: string;

  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: 'John Doe', description: 'Name of the user' })
  name: string;

  constructor(user: UserDocument) {
    this.id =
      user._id instanceof Types.ObjectId
        ? user._id.toHexString()
        : String(user._id);
    this.email = user.email;
    this.name = user.name;
  }
}
