import { IsString } from 'class-validator';

export class CreateVerifyResponseDto {
  @IsString()
  code: string;
}
