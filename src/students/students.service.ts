import { FilesService } from './../uploads/files.service';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login-auth.dto';
import { TokensService } from '../tokens/tokens.service';
import { Json } from 'sequelize/types/utils';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student) private studentRepository: typeof Student,
    private readonly tokenService: TokensService,
    private readonly jwtService: JwtService,
    private readonly fileService: FilesService
  ) { }

  // Registrate studen ////////
  async signup(
    createStudentDto: CreateStudentDto,
    res: Response,
    file: any
  ) {
    try {
      const student = await this.studentRepository.findOne({
        where: { email: createStudentDto.email },
      });
      if (student) {
        throw new BadRequestException('Bunday foydalanuvchi mavjud');
      }
      let upload_image: string = ""
      if (file) {
        upload_image = await this.fileService.createFile(file)
      }
      const hashedPassword = await bcrypt.hash(createStudentDto.password, 7);

      const newStudent = await this.studentRepository.create({
        ...createStudentDto,
        password: hashedPassword,
        image: upload_image
      });

      const payload = {
        id: newStudent.id,
        email: newStudent.email,
        is_active: newStudent.is_active,
        role: "student"
      }
      const tokens = await this.tokenService.getTokens(
        payload
      );


      return {
        id: newStudent.id,
        access_token: tokens.access_token,
      };
    } catch (error) {
      console.log(error);
      if(!error.status){
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
      }
      throw new HttpException(error.message, error.status);
    }
  }

  // SIGNIN student ///////////////////
  async signin(loginDto: LoginDto, res: Response) {
    try {
      const { email, password } = loginDto;

      const data = await this.studentRepository.findOne({
        where: { email: email },
      });

      if (!data) throw new HttpException("Email not'g'ri", HttpStatus.BAD_REQUEST);

      const passwordMatches = await bcrypt.compare(password, data.password);
      if (!passwordMatches) throw new BadRequestException("Password noto'g'ri");

      await this.studentRepository.update({
        is_active: true
      }, { where: { id: data.id } })

      const student = await this.studentRepository.findByPk(data.id)

      const payload = {
        id: student.id,
        email: student.email,
        is_active: student.is_active,
        role: "student"
      }
      const tokens = await this.tokenService.getTokens(
        payload
      );

      return {
        access_token: tokens.access_token,
      };
    } catch (error) {
      console.log(error);
      if(!error.status){
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
      }
      throw new HttpException(error.message, error.status);
    }
  }

  // LOGOUT student / / / / // / / /
  async logout(req: Request) {
    try {
      let token = req.headers.authorization
      if (!token) {
        throw new UnauthorizedException("Not found token")
      }
      token = token.split(' ')[1]
      const student = this.jwtService.verify(token, { secret: process.env.ACCESS_TOKEN_KEY })

      return await this.studentRepository.update(
        {
          is_active: false,
        },
        { where: { id: student.id } },
      );
    } catch (error) {
      console.log(error);
      if (error.message.includes("invalid signature")) {
        throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED)
      } else if (error.message.includes('jwt expired')) {
        throw new HttpException("Jwt expired", HttpStatus.UNAUTHORIZED)
      }
      throw new HttpException(error.message, error.status);
    }
  }

  // All students
  async findAll() {
    try {

      return await this.studentRepository.findAll({
        include: { all: true }
      });
    } catch (error) {
      console.log(error);
      if(!error.status){
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
      }
      throw new HttpException(error.message, error.status);
    }
  }

  // Student statistics
  async findStatistics(){
    try {
      let date = new Date()
      date.setFullYear(date.getFullYear() - 1)
      const students = await this.studentRepository.findAll()
      const arr = []
      for(let i = 0; i < 12; i++){
        date.setMonth(date.getMonth() + 1)
        let statistika = students.filter(el => el.createdAt.getFullYear() == date.getFullYear() && el.createdAt.getMonth() == date.getMonth())
        arr.push({date: date.toLocaleDateString(), statistics: statistika.length })
      }
      let years = 0
      arr.forEach(el => years+=el.statistics)
      return {
        all: students.length,
        years: years,
        months: arr
      }
    } catch (error) {
      console.log(error);
      if(!error.status){
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
      }
      throw new HttpException(error.message, error.status)
    }
  }

  async findOne(req: Request) {
    try {
      let token = req.headers.authorization
      if (!token) {
        throw new UnauthorizedException("Not found token")
      }
      token = token.split(' ')[1]
      const student = this.jwtService.verify(token, { secret: process.env.ACCESS_TOKEN_KEY })
      return await this.studentRepository.findByPk(student.id)

    } catch (error) {
      console.log(error);
      if (error.message.includes("invalid signature")) {
        throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED)
      } else if (error.message.includes('jwt expired')) {
        throw new HttpException("Jwt expired", HttpStatus.UNAUTHORIZED)
      }
      throw new HttpException(error.message, error.status)
    }
  }


  // Update studen data
  async update(req: Request, updateStudentDto: UpdateStudentDto, file: any) {
    try {
      let token = req.headers.authorization
      if (!token) {
        throw new UnauthorizedException("Not found token")
      }
      token = token.split(' ')[1]
      const student = this.jwtService.verify(token, { secret: process.env.ACCESS_TOKEN_KEY })

      let upload_image: string = ""
      if (file) {
        upload_image = await this.fileService.createFile(file)
      }

      await this.studentRepository.update({
        ...updateStudentDto,
        image: upload_image
      }, {
        where: { id: student.id },
      });
      return {
        statusCode: 200,
        message: "Updated"
      }
    } catch (error) {
      console.log(error);
      if (error.message.includes("invalid signature")) {
        throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED)
      } else if (error.message.includes('jwt expired')) {
        throw new HttpException("Jwt expired", HttpStatus.UNAUTHORIZED)
      }
      throw new HttpException(error.message, error.status);
    }
  }


}
