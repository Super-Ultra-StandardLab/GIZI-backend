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
  boardUpdateRequestData,
  boardDeleteResponseData,
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

  describe('type으로 게시글을 찾는다. ', () => {
    it('성공', async () => {
      jest
        .spyOn(boardRepository, 'find')
        .mockResolvedValue(defaultBoardResponseData);

      const result = await boardService.findByType(findByTypeData);

      expect(result).toEqual(defaultBoardResponseData);
      expect(boardRepository.find).toHaveBeenCalledWith({
        where: { type: findByTypeData.type },
      });
    });

    it('실패 - 찾는 게시물이 없다면 NotFoundException 발생', async () => {
      jest.spyOn(boardRepository, 'find').mockResolvedValue([]);

      await expect(async () => {
        await boardService.findByType(findByTypeData);
      }).rejects.toThrow(new NotFoundException());
      expect(boardRepository.find).toHaveBeenCalledWith({
        where: { type: findByTypeData.type },
      });
    });
  });

  describe('findOne한다.', () => {
    it('성공', async () => {
      jest
        .spyOn(boardRepository, 'findOne')
        .mockResolvedValue(oneBoardResponseData);

      const result = await boardService.findOne(boardIdData);
      expect(result).toEqual(oneBoardResponseData);
      expect(boardRepository.findOne).toHaveBeenCalledWith({
        where: { boardId: boardIdData },
      });
    });

    it('실패 - 찾는 게시물이 없다면 NotFoundException 발생', async () => {
      jest.spyOn(boardRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(async () => {
        await boardService.findOne(boardIdData);
      }).rejects.toThrow(new NotFoundException());
      expect(boardRepository.findOne).toHaveBeenCalledWith({
        where: { boardId: boardIdData },
      });
    });
  });
  describe('update한다.', () => {
    it('성공', async () => {
      jest
        .spyOn(boardRepository, 'update')
        .mockResolvedValue(boardUpdateResponseData);
      const result = await boardService.update(
        boardIdData,
        boardUpdateRequestData,
      );

      expect(result).toEqual(boardUpdateResponseData);
      expect(boardRepository.update).toHaveBeenCalledWith(
        boardIdData,
        boardUpdateRequestData,
      );
    });
  });

  describe('delete한다.', () => {
    it('성공', async () => {
      jest
        .spyOn(boardRepository, 'delete')
        .mockResolvedValue(boardDeleteResponseData);
      const result = await boardService.remove(boardIdData);

      expect(result).toEqual(boardDeleteResponseData);
      expect(boardRepository.delete).toHaveBeenCalledWith(boardIdData);
    });
  });
});
