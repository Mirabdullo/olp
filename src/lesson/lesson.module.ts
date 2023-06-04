import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { Lesson } from './entities/lesson.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from '../uploads/files.module';
import { Modules } from '../modules/entities/module.entity';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [SequelizeModule.forFeature([Lesson, Modules]),
  FilesModule,
  JwtModule,
  MulterModule.register({
    dest: './videos',
    fileFilter: (req, file, cb) => {
      if(!file.originalname.match(/\.(mp4|mov)$/)){
        return cb(new Error('Only video files are allowed!'), false)
      }
      cb(null, true)
    },
    limits: {fileSize: 1000000000},
  
    storage: multer.diskStorage({
      destination: './videos',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.mp4')
      }
    })
  })
  ],
  controllers: [LessonController],
  providers: [LessonService],
  exports: [LessonService]
})
export class LessonModule {}
