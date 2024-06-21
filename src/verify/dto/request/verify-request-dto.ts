import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString } from 'class-validator';

export class VerifyRequestDto {
  @IsPhoneNumber('KR')
  @ApiProperty()
  phoneNumber: string;

  @IsString()
  @ApiProperty()
  verifyCode: string;
}
