import { Expose, plainToInstance } from 'class-transformer';
import { Board } from 'src/board/entities/board.entity';
import { BoardType } from '../../entities/enum/boardType-type';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';

export class ResponseBoardDto {
  @Expose()
  @ApiProperty()
  boardId: number;

  @Expose()
  @ApiProperty()
  type: BoardType;

  @Expose()
  @ApiProperty()
  thumbnail: string;

  @Expose()
  @ApiProperty()
  title: string;

  @Expose()
  @ApiProperty()
  detail: string;

  @Expose()
  @ApiProperty()
  createdAt: string;

  static of(board: Board): ResponseBoardDto {
    return plainToInstance(ResponseBoardDto, board);
  }
}
