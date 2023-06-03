import { Injectable } from '@nestjs/common';
import { StudentsService } from 'src/students/students.service';
import { CourseService } from 'src/course/course.service';
import { EnrolledCourseService } from 'src/enrolled_course/enrolled_course.service';

@Injectable()
export class AdminStatistikaService {
  constructor(
    private readonly studentService: StudentsService,
    private readonly courseService: CourseService,
    private readonly enrolledService: EnrolledCourseService
  ){}


  async student() {
    const students = await this.studentService.findStatistics()
    return students
  }

  async enrolled() {
    const enrolled = await this.enrolledService.findStatistic()
    return enrolled
  }

  async courses(){
    const courses = await this.courseService.findAll()
    return {
      "Courses": courses.length
    }
  }


}
