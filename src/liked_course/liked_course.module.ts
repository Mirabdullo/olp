import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { LikedCourseService } from './liked_course.service';
import { LikedCourseController } from './liked_course.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { LikedCourse } from './entities/liked_course.entity';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [
    SequelizeModule.forFeature([LikedCourse]),
    JwtModule,
    CourseModule
  ],
  controllers: [LikedCourseController],
  providers: [LikedCourseService]
})
export class LikedCourseModule {}
