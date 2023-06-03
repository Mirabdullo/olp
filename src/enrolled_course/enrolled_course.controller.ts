import { EnrolledCourse } from './entities/enrolled_course.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { EnrolledCourseService } from './enrolled_course.service';
import { CreateEnrolledCourseDto } from './dto/create-enrolled_course.dto';
import { UpdateEnrolledCourseDto } from './dto/update-enrolled_course.dto';
import { ApiOperation, ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('enrolled course')
@Controller('enrolled-course')
export class EnrolledCourseController {
  constructor(private readonly enrolledCourseService: EnrolledCourseService) {}

  @ApiOperation({summary: "Enrolled kurs qo'shish"})
  @ApiResponse({status: 201, type: EnrolledCourse})
  @ApiBearerAuth()
  @Post()
  create(@Body() createEnrolledCourseDto: CreateEnrolledCourseDto, @Req() req: Request) {
    return this.enrolledCourseService.create(createEnrolledCourseDto, req);
  }

  @ApiOperation({summary: "Studentning enrolled kurslari royxati"})
  @ApiResponse({status: 200, type: [EnrolledCourse]})
  @ApiBearerAuth()
  @Get()
  findAll(@Req() req: Request) {
    return this.enrolledCourseService.findOne(req);
  }



  @ApiOperation({summary: "Id orqali bitta enrolled kursni o'chirish"})
  @ApiResponse({status: 200, type: EnrolledCourse})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enrolledCourseService.remove(id);
  }
}
