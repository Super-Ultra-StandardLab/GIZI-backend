import { Board } from 'src/board/entities/board.entity';
import { BoardType } from 'src/board/entities/enum/boardType-type';

export class ResponseAllBoardDto {
  boardId: bigint;

  type: BoardType;

  thumbnail: string;

  title: string;

  detail: string;

  createdAt: string;

  static of(board: Board[]): ResponseAllBoardDto[] {
    return board.map((board) => ({
      boardId: board.boardId,

      type: board.type,

      thumbnail: board.thumbnail,

      title: board.title,

      detail: board.detail,

      createdAt: board.createdAt,
    }));
  }
}
