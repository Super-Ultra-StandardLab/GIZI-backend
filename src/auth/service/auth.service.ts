import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdminLoginDto } from '../dto/request/admin-login.dto';
import { NotMatchedPasswordException } from 'src/global/exception/custom-exception';
const { SECRET_KEY, ADMIN_HASHED_PASSWORD } = process.env;

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async Login(adminLoginDto: AdminLoginDto) {
    const { userId, password } = adminLoginDto;
    await this.VerifyPassword(password);
    return this.getToken(userId);
  }

  async getToken(userId: string) {
    const payload = { userId: userId };

    const token = this.jwtService.sign(payload, {
      secret: SECRET_KEY,
      algorithm: 'HS256',
      expiresIn: '2h',
    });

    return {
      token,
    };
  }

  private async VerifyPassword(plainTextPassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      ADMIN_HASHED_PASSWORD,
    );
    if (!isPasswordMatching) {
      throw new NotMatchedPasswordException();
    }
  }
}
