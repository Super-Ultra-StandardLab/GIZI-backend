import { BoardType } from '../../../board/entities/enum/boardType-type';
import { FindByTypeDto } from '../../../board/dto/request/find-by-type-dto';
import { ResponseAllBoardDto } from '../../../board/dto/response/all-board-response-dto';
import { ResponseBoardDto } from '../../../board/dto/response/board-response-dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateBoardDto } from 'src/board/dto/request/update-board.dto';

export const findByTypeData: FindByTypeDto = {
  type: BoardType.ACTIVITY,
};

export const defaultBoardResponseData: ResponseAllBoardDto[] = [
  {
    boardId: 1,
    type: BoardType.ACTIVITY,
    thumbnail: 'testThumbnail',
    title: 'test',
    detail: 'test',
    createdAt: '2024-05-29T08:23:01.225Z',
  },
];

export const oneBoardResponseData: ResponseBoardDto = {
  boardId: 1,
  type: BoardType.ACTIVITY,
  thumbnail: 'testThumbnail',
  title: 'test',
  detail: 'test',
  createdAt: '2024-05-29T08:23:01.225Z',
};

export const boardIdData: number = 1;

export const boardUpdateRequestData: UpdateBoardDto = {
  type: BoardType.NOTICE,
  title: 'testTItle',
  thumbnail: 'thumbnail',
  detail: 'test',
};

export const boardUpdateResponseData: UpdateResult = {
  generatedMaps: [],
  raw: [],
  affected: 1,
};

export const boardDeleteResponseData: DeleteResult = {
  raw: [],
  affected: 1,
};
