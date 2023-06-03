import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class FilesService {
  async createFile(file: any): Promise<any> {
    try {
      if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/svg+xml' ||
        file.mimetype === 'video/mp4'
      ) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileName = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
        const filePath = path.resolve(__dirname, '..','..', 'videos');
        console.log(filePath);
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath, { recursive: true });
        }
        const imageStream = fs.createWriteStream(`${filePath}/${fileName}`);
        imageStream.write(file.buffer);
        imageStream.end();
        return fileName;
      } else {
        throw new BadRequestException(
          'Xato fayl kiritildi! (.jpeg .jpg .png .mp4 .svg ) fayllar kiritilishi mumkin',
        );
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message,
        HttpStatus.FAILED_DEPENDENCY,
      );
    }
  }

  async removeFile(file: any) {
    try {
      if (file.mimetype === 'image/jpeg') {
        const filePath = path.resolve(__dirname, '../', 'static/', 'images');
        fs.unlinkSync(path.join(filePath, file));
        return true;
      } else if (file.mimetype === 'video/mp4') {
        const filePath = path.resolve(__dirname, '../', 'static', 'videos');
        fs.unlinkSync(path.join(filePath, file));
        return true;
      } else {
        throw new HttpException(
          'Faylni yangilashda xatolik',
          HttpStatus.FAILED_DEPENDENCY,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Faylni yangilashda xatolik',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
