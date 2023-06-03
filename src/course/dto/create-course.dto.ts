import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ example: 'AAT buhgalteriya', description: 'Course nomi' })
  @IsNotEmpty()
  @IsString({ message: 'title satr bolishi kerak' })
  title: string;

  @ApiProperty({ example: 'AAT buhgalteriya', description: 'Course sub titile' })
  @IsNotEmpty()
  @IsString({ message: 'sub title satr bolishi kerak' })
  sub_title: string;


  @ApiProperty({
    example: 'Curse haqida',
    description: 'Course haqida malumotlar',
  })
  @IsNotEmpty()
  @IsString()
  description: string;


  @ApiProperty({ example: '', description: 'Course narxi'  , required: false})
  @IsOptional()
  @IsString()
  price: number;

  @ApiProperty({ example: '3', description: 'Course darajasi' , required: false })
  @IsOptional()
  @IsNumberString()
  level: number;

  @ApiProperty({ example: '66', description: 'Coursegi darslar soni' , required: false })
  @IsOptional()
  @IsNumberString()
  lessons: number;


  @ApiProperty({ type: 'string', format: 'binary' , required: false})
  @IsOptional()
  image: string;


  @ApiProperty({ type: 'string', format: 'binary' , required: false})
  @IsOptional()
  logo: string;

}
