import {
  Injectable,
  Inject,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/services/users.service';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { SignInUserDto } from '../users/dto/sign-in-user.dto';
import { AccessTokenDto } from './dto/access-token.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(signInUserDto: SignInUserDto): Promise<UserResponseDto> {
    const user = await this.usersService.findByEmail(signInUserDto.email);
    if (user && (await bcrypt.compare(signInUserDto.password, user.password))) {
      return new UserResponseDto(user);
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  login(user: UserResponseDto): AccessTokenDto {
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    return new AccessTokenDto(accessToken);
  }
}
