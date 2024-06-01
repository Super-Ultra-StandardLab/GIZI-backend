import { Expose } from 'class-transformer';

export class ImageResponseDto {
  @Expose()
  image: string;

  static of(image: string) {
    return image;
  }
}
