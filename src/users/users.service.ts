import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly logger: Logger,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    try {
      const existingUser = await this.userModel.findOne({
        email: createUserDto.email,
      });
      if (existingUser) {
        this.logger.warn(
          `Signup failed: Email already exists (${createUserDto.email})`,
        );
        throw new BadRequestException('Email already exists');
      }

      const createdUser = new this.userModel(createUserDto);
      await createdUser.save();

      return new UserResponseDto(createdUser);
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`, error.stack);
      if (!(error instanceof BadRequestException)) {
        throw new InternalServerErrorException(
          'An unexpected error occurred: ',
          error.message,
        );
      }
      throw error;
    }
  }

  async findByEmail(email: string): Promise<UserResponseDto | null> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      if (!user) return null;
      return new UserResponseDto(user);
    } catch (error) {
      this.logger.error(`Error fetching user: ${error.message}`, error.stack);
      throw new InternalServerErrorException(
        'An unexpected error occurred while fetching the user: ',
        error.message,
      );
    }
  }
}
