import { Repository } from 'typeorm';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  findByTypeData,
  oneBoardResponseData,
  defaultBoardResponseData,
  boardIdData,
  boardUpdateResponseData,
  updateRequestData,
} from '../global/tests/data/board-data';
import { NotFoundException } from '@nestjs/common';

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
      jest
        .spyOn(boardRepository, 'find')
        .mockResolvedValue(defaultBoardResponseData);

      const result = await boardService.findByType(findByTypeData);

      expect(result).toEqual(defaultBoardResponseData);
      expect(boardRepository.find).toHaveBeenCalledWith({
        where: { type: findByTypeData.type },
      });
    });

    it('find할 게 없다면 NotFoundException이 발생하는지', async () => {
      jest.spyOn(boardRepository, 'find').mockResolvedValue([]);

      await expect(async () => {
        await boardService.findByType(findByTypeData);
      }).rejects.toThrow(new NotFoundException());
      expect(boardRepository.find).toHaveBeenCalledWith({
        where: { type: findByTypeData.type },
      });
    });
  });

  describe('findOne하기', () => {
    it('정상적으로 동작하는지', async () => {
      jest
        .spyOn(boardRepository, 'findOne')
        .mockResolvedValue(oneBoardResponseData);

      const result = await boardService.findOne(boardIdData);
      expect(result).toEqual(oneBoardResponseData);
      expect(boardRepository.findOne).toHaveBeenCalledWith({
        where: { boardId: boardIdData },
      });
    });

    it('find할 게 없다면 NotFoundException이 발생하는지', async () => {
      jest.spyOn(boardRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(async () => {
        await boardService.findOne(boardIdData);
      }).rejects.toThrow(new NotFoundException());
      expect(boardRepository.findOne).toHaveBeenCalledWith({
        where: { boardId: boardIdData },
      });
    });
  });
  describe('update하기', () => {
    it('정상적으로 동작하는지', async () => {
      jest
        .spyOn(boardRepository, 'update')
        .mockResolvedValueOnce(boardUpdateResponseData);
      const result = await boardService.update(boardIdData, updateRequestData);

      expect(result).toEqual(boardUpdateResponseData);
      expect(boardRepository.update).toHaveBeenCalledWith(
        boardIdData,
        updateRequestData,
      );
    });
  });
});
