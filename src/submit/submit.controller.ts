import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { SubmitService } from './submit.service';
import { CreateSubmitDto } from './dto/request/create-submit.dto';
import { Submit } from './entities/submit.entity';

const createSubmitDto = new CreateSubmitDto();
@Controller('submit')
export class SubmitController {
  constructor(private readonly submitService: SubmitService) {}

  @Get()
  findAll(): Promise<Submit[]> {
    return this.submitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: bigint): Promise<Submit> {
    return this.submitService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createSubmitDto: CreateSubmitDto): Promise<Submit> {
    return this.submitService.create(createSubmitDto);
  }

  // guard 만들어야댐!!
  @Delete(':id')
  remove(@Param('id') id: bigint) {
    return this.submitService.remove(id);
  }
}
