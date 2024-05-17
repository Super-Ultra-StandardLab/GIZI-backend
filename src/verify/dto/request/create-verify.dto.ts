import { IsPhoneNumber } from 'class-validator';

export class CreateVerifyDto {
  @IsPhoneNumber()
  phoneNumber: string;
}
