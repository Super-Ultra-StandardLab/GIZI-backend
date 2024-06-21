import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { VerifyService } from './verify.service';
import { CreateVerifyDto } from './dto/request/create-verify.dto';
import { VerifyResponseDto } from './dto/response/verify-response-dto';
import { VerifyRequestDto } from './dto/request/verify-request-dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('verify')
@ApiTags('전화번호 인증')
export class VerifyController {
  constructor(private readonly verifyService: VerifyService) {}

  @Post('/send')
  @ApiOperation({ summary: '전화번호 인증 코드 발송' })
  @ApiResponse({
    status: 200,
    type: VerifyResponseDto,
  })
  async sendVerifyCode(
    @Body() createVerifyDto: CreateVerifyDto,
  ): Promise<VerifyResponseDto> {
    return this.verifyService.createVerify(createVerifyDto);
  }

  @Post()
  @ApiOperation({ summary: '전화번호 인증' })
  @ApiResponse({
    status: 200,
    type: VerifyResponseDto,
  })
  async verifyCode(
    @Body() verifyRequestDto: VerifyRequestDto,
  ): Promise<VerifyResponseDto> {
    return this.verifyService.verify(verifyRequestDto);
  }
}
