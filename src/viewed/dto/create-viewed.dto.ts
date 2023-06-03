import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateViewedDto {
  @ApiProperty({
    example: '173ef952-79bb-489d-9cfc-62db0d8114b4',
    description: 'Studentning idsi',
  })
  @IsUUID()
  student_id: string;

  @ApiProperty({
    example: '173ef952-79bb-489d-9cfc-62db0d8114b4',
    description: 'Course idsi',
  })
  @IsUUID()
  course_id: string;

  @ApiProperty({
    example: '173ef952-79bb-489d-9cfc-62db0d8114b4',
    description: 'Module idsi',
  })
  @IsUUID()
  module_id: string;

  @ApiProperty({
    example: '173ef952-79bb-489d-9cfc-62db0d8114b4',
    description: 'Lesson idsi',
  })
  @IsUUID()
  lesson_id: string;

  @ApiProperty({ example: '30%', description: 'Modulni tugatgan qismi' })
  @IsOptional()
  @IsNumber()
  viewed: number;
}
