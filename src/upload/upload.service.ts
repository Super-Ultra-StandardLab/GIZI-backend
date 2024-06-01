import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { generateRandomFileName } from './function/generateRandomFileName';
import { folderExistChecker } from './function/folderExistChecker';
import { ImageResponseDto } from './dto/response/image-response-dto';

@Injectable()
export class UploadService {
  getStorageOptions(file: Express.Multer.File) {
    folderExistChecker();
    const fileName = `${generateRandomFileName()}` + `${file.originalname}`;
    return new Promise<string>((resolve, reject) => {
      fs.writeFile('./images/' + fileName, file.buffer, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(ImageResponseDto.of('/image/' + fileName));
        }
      });
    });
  }
}
