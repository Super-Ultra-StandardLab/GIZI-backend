import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/request/create-board.dto';
import { UpdateBoardDto } from './dto/request/update-board.dto';
import { Board } from './entities/board.entity';
import { FindByTypeDto } from './dto/request/find-by-type-dto';
import { ResponseBoardDto } from './dto/response/board-response-dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
@Controller('board')
@ApiTags('게시판')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @ApiOperation({ summary: '게시물 생성' })
  @ApiResponse({
    status: 200,
    type: Board,
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  create(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardService.create(createBoardDto);
  }

  @Get('/type')
  @ApiOperation({ summary: '게시물 type별 조회' })
  @ApiResponse({
    status: 200,
  })
  findByType(@Query() findByTypeDto: FindByTypeDto): Promise<Board[]> {
    return this.boardService.findByType(findByTypeDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '게시물 상세 조회' })
  @ApiResponse({
    status: 200,
    type: ResponseBoardDto,
  })
  findOne(@Param('id') id: number): Promise<ResponseBoardDto> {
    return this.boardService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '게시물 업데이트' })
  @ApiResponse({
    status: 200,
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<UpdateResult> {
    return this.boardService.update(id, updateBoardDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '게시물 삭제' })
  @ApiResponse({
    status: 200,
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.boardService.remove(id);
  }
}
