import { IsPhoneNumber, IsString } from 'class-validator';

export class VerifyRequestDto {
  @IsPhoneNumber()
  phoneNumber: string;
  @IsString()
  verifyCode: string;
}
