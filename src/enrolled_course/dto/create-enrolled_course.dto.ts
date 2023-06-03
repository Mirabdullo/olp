import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateEnrolledCourseDto {

  @ApiProperty({
    example: '173ef952-79bb-489d-9cfc-62db0d8114b4',
    description: 'Course id',
  })
  @IsOptional()
  @IsUUID()
  course_id: string;
}
