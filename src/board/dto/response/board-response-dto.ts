import { Expose, plainToInstance } from 'class-transformer';
import { Board } from 'src/board/entities/board.entity';
import { BoardType } from '../../entities/enum/boardType-type';

export class ResponseBoardDto {
  @Expose()
  boardId: number;

  @Expose()
  type: BoardType;

  @Expose()
  thumbnail: string;

  @Expose()
  title: string;

  @Expose()
  detail: string;

  @Expose()
  createdAt: string;

  static of(board: Board): ResponseBoardDto {
    return plainToInstance(ResponseBoardDto, board);
  }
}
