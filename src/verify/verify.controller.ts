import { Controller, Get, Post, Body } from '@nestjs/common';
import { VerifyService } from './verify.service';
import { CreateVerifyDto } from './dto/request/create-verify.dto';
import { VerifyResponseDto } from './dto/response/verify-response-dto';
import { VerifyRequestDto } from './dto/request/verify-request-dto';

@Controller('verify')
export class VerifyController {
  constructor(private readonly verifyService: VerifyService) {}

  @Post('/send')
  async sendVerifyCode(
    @Body() createVerifyDto: CreateVerifyDto,
  ): Promise<VerifyResponseDto> {
    return this.verifyService.createVerify(createVerifyDto);
  }

  @Post()
  async verifyCode(@Body() verifyRequestDto: VerifyRequestDto) {
    return this.verifyService.verify(verifyRequestDto);
  }

  @Get()
  findAll() {
    return this.verifyService.findAll();
  }
}
