import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber } from 'class-validator';

export class CreateVerifyDto {
  @IsPhoneNumber('KR')
  @ApiProperty()
  phoneNumber: string;
}
