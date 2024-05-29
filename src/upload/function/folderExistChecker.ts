import * as fs from 'fs';

export function folderExistChecker() {
  try {
    fs.readdirSync('./images');
  } catch (err) {
    fs.mkdirSync('./images');
  }
}
