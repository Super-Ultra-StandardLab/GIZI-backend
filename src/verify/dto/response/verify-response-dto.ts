import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class VerifyResponseDto {
  @IsBoolean()
  @ApiProperty()
  result: boolean;

  static of(result: boolean): VerifyResponseDto {
    return {
      result: result,
    };
  }
}
