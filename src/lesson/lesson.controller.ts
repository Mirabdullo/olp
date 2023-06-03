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
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { Lesson } from './entities/lesson.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminGuard } from '../guards/admin.guard';
import { Response } from 'express';
import {BufferedFile} from "../minio-client/file.model";


@ApiTags('Lesson')
@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}


  @ApiOperation({ summary: 'Lesson yaratish' })
  @ApiResponse({ status: 201, type: Lesson })
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(FileInterceptor('video'))
  async uploadVideo(@Body() createLessonDto: CreateLessonDto, @UploadedFile() file: BufferedFile) {
    console.log(file);
    return this.lessonService.create(createLessonDto, file);
  }
  // async uploadVideo(@Body() createLessonDto: CreateLessonDto, @UploadedFile() file: Express.Multer.File) {
  //   console.log(file);
  //   createLessonDto.video = file.filename
  //   return this.lessonService.create(createLessonDto, file);
  // }

  // @UseGuards(AdminGuard)
  @Get(':filename')
  async getVideo(@Param('filename') filename: string, @Res() res:Response) {
    const stream = await this.lessonService.getVideoStream(filename);
    stream.pipe(res);
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
