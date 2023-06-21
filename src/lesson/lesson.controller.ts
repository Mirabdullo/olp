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
  Res,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
  UploadedFiles,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { Lesson } from './entities/lesson.entity';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { AdminGuard } from '../guards/admin.guard';
import { Request, Response } from 'express';
import path, { join } from 'path';
import  * as fs from 'fs'




@ApiTags('Lesson')
@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}


  @ApiOperation({ summary: 'Lesson yaratish' })
  @ApiResponse({ status: 201, type: Lesson })
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'video', maxCount: 1},
    {name: 'file', maxCount: 1}
  ]))
  async uploadVideo(@Body() createLessonDto: CreateLessonDto, @UploadedFiles() files: { video?: Express.Multer.File[], file?: Express.Multer.File[]}) {
      console.log(files);
      return this.lessonService.create(createLessonDto, files);
    }

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Read video' })
  @ApiResponse({ status: 201, type: Lesson })
  @Get(':filename')
  async getVideo(@Param('filename') filename: string, @Res() res: Response, @Req() req: Request) {
    try {
      const videoPath = join(__dirname, '../../videos', filename);
        
      const stat = fs.statSync(videoPath);
      const fileSize = stat.size;
      const range = req.headers.range;
  
      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(videoPath, { start, end });
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
        };
  
        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
        };
  
        res.writeHead(200, head);
        fs.createReadStream(videoPath).pipe(res);
      }
    } catch (error) {
      console.log(error);
      if(!error.status){
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
      }

      throw new HttpException(error.message, error.status)
    }
  }




  @ApiOperation({ summary: 'Barcha lessonlar royhati' })
  @ApiResponse({ status: 200, type: [Lesson] })
  @Get()
  findAll() {
    return this.lessonService.findAll();
  }



  @ApiOperation({ summary: 'Id orqali bitta modulega tegishli darslar royxati' })
  @ApiResponse({ status: 200, type: [Lesson] })
  @Get('lessons/:id')
  findModules(@Param('id') id: string) {
    return this.lessonService.findModules(id);
  }

  @ApiOperation({ summary: 'id orqali bitta lesson malumotlari' })
  @ApiResponse({ status: 200, type: Lesson })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonService.findOne(id);
  }

  @ApiOperation({ summary: 'Lessonni ozgartirish' })
  @ApiResponse({ status: 200, type: Lesson })
  @UseInterceptors(FileInterceptor('video'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLessonDto: UpdateLessonDto,
    @UploadedFile() file: any,
  ) {
    return this.lessonService.update(id, updateLessonDto, file);
  }
  @ApiOperation({ summary: 'Lessonni ochirish' })
  @ApiResponse({ status: 200, type: Lesson })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonService.remove(id);
  }
}
