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
  async create(@Body() createCourseDto: CreateCourseDto, @UploadedFiles()  files: { image?: Express.Multer.File[], logo?: Express.Multer.File[] },) {
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







  // @Post('images')
  // @UseInterceptors(
  //   FileInterceptor('image', {
  //     storage: diskStorage({
  //       destination: './images',
  //       filename: (req, file, cb) => {
  //         console.log(file);
  //         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  //         const extension = extname(file.originalname);
  //         cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
  //       },
  //     }),
  //     // limits: { fileSize: 1024 * 1024 }, // 1MB
  //     // fileFilter: (req, file, cb) => {
  //     //   if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
  //     //     return cb(new BadRequestException('Only image files are allowed!'),null);
  //     //   }
  //     //   cb(null, true);
  //     // },
  //   }),
  //   FileInterceptor('logo', {
  //     storage: diskStorage({
  //       destination: './images',
  //       filename: (req, file, cb) => {
  //         console.log(file);
  //         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  //         const extension = extname(file.originalname);
  //         console.log(extension);
  //         cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
  //       },
  //     }),
  //     // limits: { fileSize: 1024 * 1024 }, // 1MB
  //     // fileFilter: (req, file, cb) => {
  //     //   if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
  //     //     return cb(new BadRequestException('Only image files are allowed!'), null);
  //     //   }
  //     //   cb(null, true);
  //     // },
  //   }),
  // )
  // async uploadImage( @UploadedFile() image:Express.Multer.File, @UploadedFile() logo:Express.Multer.File) {
  //   try {
  //     console.log(image);
  //     const imageFileName = image.filename;
  //     const logoFileName = logo.filename;
  //     const imageStream = createWriteStream(`/path/to/${imageFileName}`);
  //     const logoStream = createWriteStream(`/path/to/${logoFileName}`);
  //     imageStream.write(image.buffer);
  //     logoStream.write(logo.buffer);
  //     imageStream.end();
  //     logoStream.end();
  //     console.log(`Uploaded image: ${imageFileName}`);
  //     console.log(`Uploaded logo: ${logoFileName}`);
  //     return { message: 'Image uploaded successfully', imageFileName, logoFileName }; 
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

























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
  @UseInterceptors(FilesInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @UploadedFiles() file: any,
  ) {
    return this.courseService.update(id, updateCourseDto, file);
  }

  @ApiOperation({ summary: 'Id orqali courseni ochirish' })
  @ApiResponse({ status: 200, type: Course })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}
