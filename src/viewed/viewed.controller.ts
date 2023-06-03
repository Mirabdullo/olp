import { Viewed } from './entities/viewed.entity';
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
import { ViewedService } from './viewed.service';
import { CreateViewedDto } from './dto/create-viewed.dto';
import { UpdateViewedDto } from './dto/update-viewed.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Viewed')
@Controller('viewed')
export class ViewedController {
  constructor(private readonly viewedService: ViewedService) {}

  @ApiOperation({ summary: 'Viewed yaratish' })
  @ApiResponse({ status: 201, type: Viewed })
  @Post()
  create(@Body() createViewedDto: CreateViewedDto) {
    return this.viewedService.create(createViewedDto);
  }


  @ApiOperation({ summary: 'Course id va Student id orqali Kursni necha foizini yakunlagani haqida' })
  @ApiResponse({ status: 200, type: Viewed })
  @Get(':student_id/:course_id')
  findOne(@Param('student_id') student_id: string, @Param('course_id') course_id: string) {
    return this.viewedService.findOne( student_id, course_id);
  }

}
