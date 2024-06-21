import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ImageResponseDto {
  @Expose()
  @ApiProperty()
  image: string;

  static of(image: string) {
    return image;
  }
}
