import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class AdminLoginDto {
  @Transform((params) => params.value.trim())
  @IsString()
  @ApiProperty()
  userId!: string;

  @IsString()
  @ApiProperty()
  password!: string;
}
