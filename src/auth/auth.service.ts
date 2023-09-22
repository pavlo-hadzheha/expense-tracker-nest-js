import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async validateUserCredentials(
    signInDto: SignInDto,
  ): Promise<Pick<User, 'username' | 'id'> | never> {
    const { password, username } = signInDto;
    const user = await this.usersRepository.findOneBy({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { username, id } = user;
      return { username, id };
    } else {
      throw new UnauthorizedException('Please, check your login credentials');
    }
  }

  async signIn(signInDto: SignInDto): Promise<string | never> {
    const user = await this.validateUserCredentials(signInDto);
    return this.jwtService.signAsync(user);
  }

  signUp(signUpDto: SignInDto) {
    return this.usersRepository.createUser(signUpDto);
  }
}
