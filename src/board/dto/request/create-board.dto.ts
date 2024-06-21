import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BoardType } from '../../entities/enum/boardType-type';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  @IsEnum(BoardType)
  @ApiProperty()
  type: BoardType;

  @IsOptional()
  @IsString()
  @ApiProperty()
  thumbnail?: string;

  @IsString()
  @ApiProperty()
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  detail?: string;
}
