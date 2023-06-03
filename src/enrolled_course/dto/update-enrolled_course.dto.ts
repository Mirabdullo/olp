import { PartialType } from '@nestjs/swagger';
import { CreateEnrolledCourseDto } from './create-enrolled_course.dto';

export class UpdateEnrolledCourseDto extends PartialType(CreateEnrolledCourseDto) {}
