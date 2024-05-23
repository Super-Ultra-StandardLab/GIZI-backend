import { diskStorage } from 'multer';
import { extname } from 'path';

export function uploadAndGetLink() {
  diskStorage({
    destination: './image',
    filename(_, file, callback): void {
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      return callback(null, `${randomName}${extname(file.originalname)}`);
    },
  });
}
