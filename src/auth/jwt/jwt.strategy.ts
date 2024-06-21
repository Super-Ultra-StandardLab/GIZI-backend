import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../dto/user.dto';
import { plainToClass } from '@nestjs/class-transformer';

const { SECRET_KEY } = process.env;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET_KEY,
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    const user = await this.getUser(payload.userId);
    return user;
  }

  private async getUser(id: string) {
    const user = {
      userId: id,
    };
    return plainToClass(UserDto, {
      ...user,
    });
  }
}
