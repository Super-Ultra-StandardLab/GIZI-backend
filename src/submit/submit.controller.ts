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

@Controller('submit')
export class SubmitController {
  constructor(private readonly submitService: SubmitService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createSubmitDto: CreateSubmitDto): Promise<Submit> {
    return this.submitService.create(createSubmitDto);
  }

  @Get()
  findAll(): Promise<Submit[]> {
    return this.submitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: bigint) {
    return this.submitService.findOne(id);
  }

  // guard 만들어야댐!!
  @Delete(':id')
  remove(@Param('id') id: bigint) {
    return this.submitService.remove(id);
  }
}
