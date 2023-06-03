import { LikedCourse } from './entities/liked_course.entity';
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
import { LikedCourseService } from './liked_course.service';
import { CreateLikedCourseDto } from './dto/create-liked_course.dto';
import { UpdateLikedCourseDto } from './dto/update-liked_course.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Liked course')
@Controller('liked-course')
export class LikedCourseController {
  constructor(private readonly likedCourseService: LikedCourseService) {}

  @ApiOperation({summary: "Liked kurs qo'shish"})
  @ApiResponse({status: 201, type: LikedCourse})
  @ApiBearerAuth()
  @Post()
  create(@Body() createLikedCourseDto: CreateLikedCourseDto, @Req() req: Request) {
    return this.likedCourseService.create(createLikedCourseDto, req);
  }


  @ApiOperation({summary: "Studentning yoqtirgan kurslari"})
  @ApiResponse({status: 201, type: LikedCourse})
  @Get()
  findOne(@Req() req: Request) {
    return this.likedCourseService.findOne(req);
  }


  @ApiOperation({summary: "Remove like"})
  @ApiResponse({status: 201, type: LikedCourse})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likedCourseService.remove(id);
  }
}
