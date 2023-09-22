import { PassportStrategy } from '@nestjs/passport';
import { User } from './user.entity';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IJwtPayload } from './jwt-payload';
import { UsersService } from './users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(jwtPayload: IJwtPayload): Promise<User | never> {
    const user = await this.usersService.getByUsername(jwtPayload.username);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    delete user.password;
    return user;
  }
}
