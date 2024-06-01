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
import { DeleteResult } from 'typeorm';

@Controller('submit')
export class SubmitController {
  constructor(private readonly submitService: SubmitService) {}

  // TODO: guard 추가하기
  @Get()
  findAll(): Promise<Submit[]> {
    return this.submitService.findAll();
  }

  // TODO: guard 추가하기
  @Get(':id')
  async findOne(@Param('id') id: bigint): Promise<ResponseSubmitDto> {
    return await this.submitService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createSubmitDto: CreateSubmitDto): Promise<Submit> {
    return this.submitService.create(createSubmitDto);
  }

  // TODO: guard 추가하기
  @Delete(':id')
  remove(@Param('id') id: bigint): Promise<DeleteResult> {
    return this.submitService.remove(id);
  }
}
