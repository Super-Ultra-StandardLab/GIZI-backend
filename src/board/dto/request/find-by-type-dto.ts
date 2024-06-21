import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { BoardType } from 'src/board/entities/enum/boardType-type';

export class FindByTypeDto {
  @IsEnum(BoardType)
  @ApiProperty()
  type: BoardType;
}
