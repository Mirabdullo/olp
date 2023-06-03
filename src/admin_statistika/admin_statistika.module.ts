import { Module } from '@nestjs/common';
import { AdminStatistikaService } from './admin_statistika.service';
import { AdminStatistikaController } from './admin_statistika.controller';
import { StudentsModule } from 'src/students/students.module';
import { CourseModule } from 'src/course/course.module';
import { EnrolledCourseModule } from 'src/enrolled_course/enrolled_course.module';

@Module({
  imports: [
    StudentsModule,
    CourseModule,
    EnrolledCourseModule,
  ],
  controllers: [AdminStatistikaController],
  providers: [AdminStatistikaService]
})
export class AdminStatistikaModule {}

