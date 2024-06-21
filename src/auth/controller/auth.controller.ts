import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCookieAuth,
  ApiBearerAuth,
} from '@nestjs/swagger/dist';
import { AdminLoginDto } from '../dto/request/admin-login.dto';
import { Token } from '../models/token.model';
import { JwtAuthGuard } from '../jwt/jwt.guard';

@Controller('auth')
@ApiTags('유저')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/admin/login')
  @ApiOperation({ summary: '어드민 로그인' })
  @ApiResponse({
    status: 200,
    type: Token,
  })
  login(@Body() adminLoginDto: AdminLoginDto) {
    return this.authService.Login(adminLoginDto);
  }

  @Get('/admin')
  @ApiOperation({ summary: '어드민 로그인 인증' })
  @ApiResponse({
    status: 200,
    type: String,
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  getUser() {
    return '성공';
  }
}
