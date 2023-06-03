import { TokensModule } from './../tokens/tokens.module';
import { JwtService, JwtModule } from '@nestjs/jwt';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
import { CreateLikedCourseDto } from './dto/create-liked_course.dto';
import { UpdateLikedCourseDto } from './dto/update-liked_course.dto';
import { LikedCourse } from './entities/liked_course.entity';
import { CourseService } from '../course/course.service';

@Injectable()
export class LikedCourseService {
  constructor(
    @InjectModel(LikedCourse)
    private likedRepository: typeof LikedCourse,
    private jwtService: JwtService,
    private courseService: CourseService
  ) {}
  async create(createLikedCourseDto: CreateLikedCourseDto, req: Request) {
    try {
      let token = req.headers.authorization
      if(!token) {
        throw new UnauthorizedException("Token topilmadi")
      }
      token = token.split(' ')[1]
      const student = this.jwtService.verify(token,{secret: process.env.ACCESS_TOKEN_KEY})
      
      if(!(await this.courseService.findOne(createLikedCourseDto.course_id))){
        throw new BadRequestException("course id does not matched")
      }

      await this.likedRepository.create({
        student_id: student.id,
        course_id: createLikedCourseDto.course_id
      })
      
      return {
        statusCode: 201,
        message: 'Created',
      };
    } catch (error) {
      if (error.message.includes('invalid signature')) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      } else if (error.message.includes('jwt expired')) {
        throw new HttpException('Jwt expired', HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException(error.message, error.status);
    }
  }


  async findOne(req: Request) {
    try {
      let token = req.headers.authorization
      if(!token){
        throw new UnauthorizedException("Token topilmadi")
      }
      const student = await this.jwtService.verify(token, {secret: process.env.ACCESS_TOKEN_KEY})

      const data = await this.likedRepository.findAll({ where: {student_id: student.id}, include:{all: true}
      });

      return data;
    } catch (error) {
      if (error.message.includes('invalid signature')) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      } else if (error.message.includes('jwt expired')) {
        throw new HttpException('Jwt expired', HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException(error.message, error.status);
    }
  }



  async remove(id: string) {
    try {
      const enrolled = await this.likedRepository.findByPk(id);
      if (!enrolled)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      return await this.likedRepository.destroy({ where: { id: id } });
    } catch (error) {
      if(!error.status){
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
      }
      throw new HttpException(error.message, error.status);
    }
  }
}
