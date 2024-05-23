import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/request/create-board.dto';
import { UpdateBoardDto } from './dto/request/update-board.dto';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getKoreaTime } from './function/getKoreaTime';
import { ResponseAllBoardDto } from './dto/response/all-board-response-dto';
import { FindByTypeDto } from './dto/request/find-by-type-dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly BoardRepository: Repository<Board>,
  ) {}

  create(createBoardDto: CreateBoardDto): Promise<Board> {
    const koreaTime = getKoreaTime();
    createBoardDto.createdAt = koreaTime; // 한국날짜
    return this.BoardRepository.save(createBoardDto);
  }

  async findAll(): Promise<Board[]> {
    return ResponseAllBoardDto.of(await this.BoardRepository.find());
  }

  findOne(boardId: bigint) {
    return this.BoardRepository.findOne({ where: { boardId } });
  }

  async findByType(findByTypeDto: FindByTypeDto): Promise<Board[]> {
    return ResponseAllBoardDto.of(
      await this.BoardRepository.find({
        where: {
          type: findByTypeDto.type,
        },
      }),
    );
  }
  update(boardId: number, updateBoardDto: UpdateBoardDto) {
    return this.BoardRepository.update(boardId, updateBoardDto);
  }

  remove(id: number) {
    return this.BoardRepository.delete(id);
  }
}
