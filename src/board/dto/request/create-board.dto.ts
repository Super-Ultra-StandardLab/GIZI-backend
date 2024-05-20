import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BoardType } from '../../entities/enum/boardType-type';

export class CreateBoardDto {
  @IsEnum(BoardType)
  type: BoardType;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  detail?: string;

  @IsOptional()
  @IsString()
  createdAt?: string;
}
