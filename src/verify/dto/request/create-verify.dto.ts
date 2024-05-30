import { IsPhoneNumber } from 'class-validator';

export class CreateVerifyDto {
  @IsPhoneNumber('KR')
  phoneNumber: string;
}
