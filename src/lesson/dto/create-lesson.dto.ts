import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({ example: 'lesson', description: 'Title nomi' })
  @IsNotEmpty()
  @IsString({ message: 'title must be a string' })
  title: string;

  @ApiProperty({ type: 'string', format: 'binary' , required: false})
  @IsOptional()
  @IsString()
  video: string;

  @ApiProperty({ type: 'string', format: 'binary' , required: false})
  @IsOptional()
  @IsString()
  file: string;

  @ApiProperty({ example: 'description', description: 'description nomi' })
  @IsString({ message: 'description must be a string' })
  description: string;

  @ApiProperty({ example: '173ef952-79bb-489d-9cfc-62db0d8114b4', description: 'Module idsi' })
  @IsNotEmpty()
  @IsUUID()
  module_id: string;

}
