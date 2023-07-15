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
import path from 'path';
import { StudentsService } from 'src/students/students.service';
import { EnrolledCourseGuard } from 'src/guards/user.guard';


@Module({
  imports: [SequelizeModule.forFeature([Lesson, Modules]),
  FilesModule,
  JwtModule,
  MulterModule.register({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        let uploadPath = './videos';

        // if (file.mimetype === 'application/pdf') {
        //   uploadPath += 'pdfs/';
        // } else if (file.mimetype === 'video/mp4' || file.mimetype === 'video/quicktime') {
        //   uploadPath += 'videos/';
        // }

        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.')[1]);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (file.mimetype === 'application/pdf' || file.mimetype === 'video/mp4' || file.mimetype === 'video/quicktime') {
        cb(null, true);
      } else {
        cb(new Error('Only PDF, MP4, and MOV files are allowed!'), false);
      }
    },
    limits: { fileSize: 1000000000 },
  }),
  // MulterModule.register({
  //   dest: './videos',
  //   fileFilter: (req, file, cb) => {
  //     if(!file.originalname.match(/\.(mp4|mov)$/)){
  //       return cb(new Error('Only video files are allowed!'), false)
  //     }
  //     cb(null, true)
  //   },
  //   limits: {fileSize: 1000000000},
  
  //   storage: multer.diskStorage({
  //     destination: './videos',
  //     filename: (req, file, cb) => {
  //       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  //       cb(null, file.fieldname + '-' + uniqueSuffix + '.mp4')
  //     }
  //   })
  // })
  ],
  controllers: [LessonController],
  providers: [LessonService, EnrolledCourseGuard],
  exports: [LessonService, EnrolledCourseGuard],
})
export class LessonModule {}
