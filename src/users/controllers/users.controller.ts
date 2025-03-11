import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Logger,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { SignInUserDto } from '../dto/sign-in-user.dto';
import { AccessTokenDto } from '../../auth/dto/access-token.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: Logger,
  ) {}

  @Post('signup')
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    this.logger.log(`Creating user with email: ${createUserDto.email}`);
    return this.usersService.createUser(createUserDto);
  }

  @Post('signin')
  @ApiOperation({ summary: 'User sign in' })
  @ApiResponse({
    status: 201,
    description: 'User signed in successfully',
    type: AccessTokenDto,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async signin(@Body() signInUserDto: SignInUserDto): Promise<AccessTokenDto> {
    this.logger.log(`Authentication attempt for email: ${signInUserDto.email}`);
    return this.usersService.signIn(signInUserDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
    type: UserResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Invalid or missing token',
  })
  getProfile(@Req() req): UserResponseDto {
    this.logger.log(`Read the profile for user with email : ${req.user.email}`);
    return this.usersService.profile(req.user);
  }
}
