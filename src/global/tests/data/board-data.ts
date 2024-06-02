import { BoardType } from '../../../board/entities/enum/boardType-type';
import { FindByTypeDto } from '../../../board/dto/request/find-by-type-dto';
import { Board } from '../../../board/entities/board.entity';

export const findByTypeData: FindByTypeDto = {
  type: BoardType.ACTIVITY,
};

export const defaultResponseData: Board[] = [
  {
    boardId: 1,
    type: BoardType.ACTIVITY,
    thumbnail: 'testThumbnail',
    title: 'test',
    detail: 'test',
    createdAt: '2024-05-29T08:23:01.225Z',
  },
];
