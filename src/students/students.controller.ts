import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Request, Response } from 'express';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Student } from './entities/student.entity';
import { LoginDto } from './dto/login-auth.dto';

@ApiTags('Student')
@Controller('student')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @ApiOperation({ summary: 'Student uchun signup qilishi' })
  @ApiResponse({ status: 201, type: Student })
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes("multipart/form-data")
  @Post('signup')
  signup(
    @Body() createStudentDto: CreateStudentDto,
    @Res({ passthrough: true }) res: Response,
    @UploadedFile() file: any
  ) {
    return this.studentsService.signup(createStudentDto, res, file);
  }

  @ApiOperation({ summary: 'Student uchun signin qilish' })
  @ApiResponse({ status: 200, type: Student })
  @Post('signin')
  signin(
    @Body() loginStudentDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.studentsService.signin(loginStudentDto, res);
  }

  @ApiOperation({ summary: 'Student logout qilish' })
  @ApiResponse({ status: 200, type: Student })
  @Get('logout')
  logout(@Req() req: Request) {
    return this.studentsService.logout(req);
  }

  @ApiOperation({ summary: 'Barcha studentlar royxatini olish' })
  @ApiResponse({ status: 200, type: Student })
  @Get('all')
  findAll() {
    return this.studentsService.findAll();
  }

  

  @ApiOperation({ summary: 'student shaxsiy malumotlari' })
  @ApiResponse({ status: 200, type: Student })
  @Get()
  findOne(@Req() req: Request) {
    return this.studentsService.findOne(req);
  }


  @ApiOperation({ summary: 'Student update by token' })
  @ApiResponse({ status: 200, type: Student })
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes("multipart/form-data")
  @ApiBearerAuth()
  @Patch()
  update(
    @Req() req: Request, 
    @Body() updateStudentDto: UpdateStudentDto, 
    @UploadedFile() file: any) {
    return this.studentsService.update(req, updateStudentDto, file);
  }

}
