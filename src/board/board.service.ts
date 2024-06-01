import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/request/create-board.dto';
import { UpdateBoardDto } from './dto/request/update-board.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Board } from './entities/board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseAllBoardDto } from './dto/response/all-board-response-dto';
import { FindByTypeDto } from './dto/request/find-by-type-dto';
import { ResponseBoardDto } from './dto/response/board-response-dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly BoardRepository: Repository<Board>,
  ) {}

  create(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.BoardRepository.save(createBoardDto);
  }

  async findOne(boardId: bigint): Promise<ResponseBoardDto> {
    return ResponseBoardDto.of(
      await this.BoardRepository.findOne({ where: { boardId } }),
    );
  }

  async findByType(findByTypeDto: FindByTypeDto): Promise<Board[]> {
    return ResponseAllBoardDto.listOf(
      await this.BoardRepository.find({
        where: {
          type: findByTypeDto.type,
        },
      }),
    );
  }
  update(
    boardId: number,
    updateBoardDto: UpdateBoardDto,
  ): Promise<UpdateResult> {
    return this.BoardRepository.update(boardId, updateBoardDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.BoardRepository.delete(id);
  }
}
