import { Repository } from 'typeorm';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  defaultResponseData,
  findByTypeData,
} from '../global/tests/data/board-data';

describe('BoardService', () => {
  let boardService: BoardService;
  let boardRepository: Repository<Board>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardService,
        {
          provide: getRepositoryToken(Board),
          useClass: Repository,
        },
      ],
    }).compile();

    boardService = module.get<BoardService>(BoardService);
    boardRepository = module.get<Repository<Board>>(getRepositoryToken(Board));
  });
  it('boardService가 정의되었는지', () => {
    expect(boardService).toBeDefined();
  });

  describe('Type에 따라 찾기', () => {
    it('정상적으로 find되는지', async () => {
      const board = new Board();

      jest
        .spyOn(boardRepository, 'find')
        .mockResolvedValue(defaultResponseData);

      const result = await boardService.findByType(findByTypeData);

      expect(result).toEqual(board);
      expect(boardRepository.find).toHaveBeenCalledWith({
        where: { type: findByTypeData },
      });
    });
  });
});
