import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { SubmitService } from './submit.service';
import { CreateSubmitDto } from './dto/request/create-submit.dto';
import { Submit } from './entities/submit.entity';
import { ResponseSubmitDto } from './dto/response/submit-response-dto';
import { DeleteResult } from 'typeorm';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('submit')
@ApiTags('신청')
export class SubmitController {
  constructor(private readonly submitService: SubmitService) {}

  @Get()
  @ApiOperation({ summary: '모든 신청 조회' })
  @ApiResponse({
    status: 200,
    type: [Submit],
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<Submit[]> {
    return await this.submitService.findAll();
  }

  @Get('calendar')
  @ApiOperation({ summary: '신청 캘린더 조회' })
  @ApiResponse({
    status: 200,
    type: [Submit],
  })
  async findCalendar(
    @Query('year') year: number,
    @Query('month') month: number,
  ): Promise<Submit[]> {
    return this.submitService.findCalendar(month, year);
  }

  @Get(':id')
  @ApiOperation({ summary: '신청 단건 조회' })
  @ApiResponse({
    status: 200,
    type: ResponseSubmitDto,
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: number): Promise<ResponseSubmitDto> {
    return await this.submitService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: '수강 신청' })
  @ApiResponse({
    status: 201,
  })
  @HttpCode(201)
  async create(@Body() createSubmitDto: CreateSubmitDto): Promise<Submit> {
    return this.submitService.create(createSubmitDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '수강 신청 요청 삭제' })
  @ApiResponse({
    status: 200,
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.submitService.remove(id);
  }
}
