import { Expose } from '@nestjs/class-transformer';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class UserDto {
  @Expose()
  @ApiProperty()
  userId: string;
}
