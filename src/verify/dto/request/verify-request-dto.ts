import { IsPhoneNumber, IsString } from 'class-validator';

export class VerifyRequestDto {
  @IsPhoneNumber('KR')
  phoneNumber: string;
  @IsString()
  verifyCode: string;
}
