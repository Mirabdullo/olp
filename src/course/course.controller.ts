import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { createWriteStream } from 'fs';
import { FilesService } from '../uploads/files.service';

@ApiTags('Course')
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService,
    private readonly fileService:FilesService
    ) {}

  @ApiOperation({ summary: 'Course qoshish' })
  @ApiResponse({ status: 201, type: Course })
  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
  ]))
  @ApiConsumes('multipart/form-data')
  async create(@Body() createCourseDto: CreateCourseDto, @UploadedFiles()  files: { image?: Express.Multer.File[], logo?: Express.Multer.File[] }) {
    console.log(files);
    let upload_image: string = ''
    let upload_logo: string = ''

        if(files.image){
          upload_image = await this.fileService.createFile(files.image[0])         
        }
  
        if(files.logo){
          upload_logo = await this.fileService.createFile(files.logo[0])
        }
        createCourseDto.image = upload_image
        createCourseDto.logo = upload_logo
    return this.courseService.create(createCourseDto, files);
  }




  @ApiOperation({ summary: 'Courselar royxati' })
  @ApiResponse({ status: 200, type: [Course] })
  @Get()
  findAll() {
    return this.courseService.findAll();
  }


  @ApiOperation({ summary: 'Id orqali bitta kourse' })
  @ApiResponse({ status: 200, type: Course })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @ApiOperation({ summary: 'Id orqali bitta course malumotlarini ozgartirish' })
  @ApiResponse({ status: 200, type: Course })
  @Patch(':id')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
  ]))
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @UploadedFiles()  files: { image?: Express.Multer.File[], logo?: Express.Multer.File[] },
  ) {
    console.log(files);
    const data = await this.courseService.findOne(id);
    if (!data)
    throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);

    let upload_image: string = data.image
    let upload_logo: string = data.logo

        if(files.image){
          upload_image = await this.fileService.createFile(files.image[0])         
        }
  
        if(files.logo){
          upload_logo = await this.fileService.createFile(files.logo[0])
        }
        updateCourseDto.image = upload_image
        updateCourseDto.logo = upload_logo
    return this.courseService.update(id, updateCourseDto);
  }

  @ApiOperation({ summary: 'Id orqali courseni ochirish' })
  @ApiResponse({ status: 200, type: Course })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}
