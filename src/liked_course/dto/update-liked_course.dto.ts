import { PartialType } from '@nestjs/swagger';
import { CreateLikedCourseDto } from './create-liked_course.dto';

export class UpdateLikedCourseDto extends PartialType(CreateLikedCourseDto) {}
