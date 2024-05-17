import { IsBoolean } from 'class-validator';

export class VerifyResponseDto {
  @IsBoolean()
  result: boolean;
}
