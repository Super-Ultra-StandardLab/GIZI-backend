import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { generateRandomFileName } from './function/generateRandomFileName';
import { folderExistChecker } from './function/folderExistChecker';

@Injectable()
export class UploadService {
  getStorageOptions(file) {
    folderExistChecker();
    const fileName = `${generateRandomFileName()}` + `${file.originalname}`;
    return new Promise<string>((resolve, reject) => {
      fs.writeFile('./images/' + fileName, file.buffer, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve('/image/' + fileName);
        }
      });
    });
  }
}
