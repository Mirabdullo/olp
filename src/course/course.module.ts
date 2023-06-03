import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Course } from './entities/course.entity';
import { FilesModule } from '../uploads/files.module';
import { Statistic } from '../statistics/entities/statistic.entity';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';

@Module({
  imports: [
    SequelizeModule.forFeature([Course, Statistic]),
    FilesModule,
    ConfigModule,
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService]
})
export class CourseModule {}
