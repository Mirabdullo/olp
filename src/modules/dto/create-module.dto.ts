import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateModuleDto {
  @ApiProperty({
    example: '173ef952-79bb-489d-9cfc-62db0d8114b4',
    description: 'Course id',
  })
  @IsUUID()
  course_id: string;

  @ApiProperty({ example: 'Title', description: 'title nomi' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Description', description: 'Description nomi' })
  @IsString()
  description: string;

}
