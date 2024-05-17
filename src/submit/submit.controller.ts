import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { SubmitService } from './submit.service';
import { CreateSubmitDto } from './dto/request/create-submit.dto';
import { Submit } from './entities/submit.entity';
import { ResponseSubmitDto } from './dto/response/submit-response-dto';

@Controller('submit')
export class SubmitController {
  constructor(private readonly submitService: SubmitService) {}

  // guard 추가하기
  @Get()
  findAll(): Promise<Submit[]> {
    return this.submitService.findAll();
  }

  // guard 추가하기
  @Get(':id')
  async findOne(@Param('id') id: bigint): Promise<ResponseSubmitDto> {
    return await this.submitService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createSubmitDto: CreateSubmitDto) {
    return this.submitService.create(createSubmitDto);
  }

  // guard 추가하기
  @Delete(':id')
  remove(@Param('id') id: bigint) {
    return this.submitService.remove(id);
  }
}
