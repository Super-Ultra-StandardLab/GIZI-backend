import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubmitService } from './submit.service';
import { CreateSubmitDto } from './dto/create-submit.dto';
import { UpdateSubmitDto } from './dto/update-submit.dto';

@Controller('submit')
export class SubmitController {
  constructor(private readonly submitService: SubmitService) {}

  @Post()
  create(@Body() createSubmitDto: CreateSubmitDto) {
    return this.submitService.create(createSubmitDto);
  }

  @Get()
  findAll() {
    return this.submitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.submitService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubmitDto: UpdateSubmitDto) {
    return this.submitService.update(+id, updateSubmitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.submitService.remove(+id);
  }
}
