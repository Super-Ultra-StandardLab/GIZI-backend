import { IsBoolean } from 'class-validator';

export class VerifyResponseDto {
  @IsBoolean()
  result: boolean;

  static of(result: boolean): VerifyResponseDto {
    return {
      result: result,
    };
  }
}
