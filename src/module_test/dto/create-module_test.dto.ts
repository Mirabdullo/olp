import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateModuleTestDto {
  @ApiProperty({
    example: '173ef952-79bb-489d-9cfc-62db0d8114b4',
    description: 'Qaysi coursega tegishliligi',
  })
  @IsUUID()
  course_id: string;

  @ApiProperty({
    example: '173ef952-79bb-489d-9cfc-62db0d8114b4',
    description: 'Qaysi modulega tegishliligi',
  })
  @IsUUID()
  module_id: string;

  @ApiProperty({
    example:"What is it?", description:"Test savoli"
  })
  @IsNotEmpty()
  @IsString()
  question:string;

  @ApiProperty({ example: '[{title:"some", isCorrect:true}, ..., ...]', description: 'Variantlar' })
  @IsArray()
  answers: Array<object>;


}
