import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { EnrolledCourseService } from './enrolled_course.service';
import { EnrolledCourseController } from './enrolled_course.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EnrolledCourse } from './entities/enrolled_course.entity';
import { Student } from '../students/entities/student.entity';
import { Course } from '../course/entities/course.entity';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [
    SequelizeModule.forFeature([EnrolledCourse, Student, Course]),
    JwtModule,
    CourseModule
  ],
  controllers: [EnrolledCourseController],
  providers: [EnrolledCourseService],
  exports: [EnrolledCourseService]
})
export class EnrolledCourseModule {}
