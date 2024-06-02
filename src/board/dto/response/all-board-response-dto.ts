import { Expose, plainToInstance } from 'class-transformer';
import { Board } from 'src/board/entities/board.entity';
import { BoardType } from '../../entities/enum/boardType-type';

export class ResponseAllBoardDto {
  @Expose()
  boardId: bigint;

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

  static listOf(board: Board[]): ResponseAllBoardDto[] {
    return plainToInstance(ResponseAllBoardDto, board);
  }
}
