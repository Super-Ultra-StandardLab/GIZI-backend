import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/request/create-board.dto';
import { UpdateBoardDto } from './dto/request/update-board.dto';
import { Board } from './entities/board.entity';
import { FindByTypeDto } from './dto/request/find-by-type-dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  // guard 필요
  @Post()
  create(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardService.create(createBoardDto);
  }

  @Get()
  findAll(): Promise<Board[]> {
    return this.boardService.findAll();
  }

  @Get('/type')
  findByType(@Query() findByTypeDto: FindByTypeDto): Promise<Board[]> {
    return this.boardService.findByType(findByTypeDto);
  }

  @Get(':id')
  findOne(@Param('id') id: bigint) {
    return this.boardService.findOne(id);
  }

  // guard 필요
  @Put(':id')
  update(@Param('id') id: number, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(id, updateBoardDto);
  }

  // guard 필요
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.boardService.remove(id);
  }
}
