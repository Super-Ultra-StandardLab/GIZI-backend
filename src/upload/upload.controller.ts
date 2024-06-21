import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { ImageResponseDto } from './dto/response/image-response-dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('upload')
@ApiTags('업로드')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: '이미지 업로드' })
  @ApiResponse({
    status: 200,
    type: ImageResponseDto,
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ImageResponseDto> {
    const image = await this.uploadService.storageImage(file);

    return { image };
  }
}
