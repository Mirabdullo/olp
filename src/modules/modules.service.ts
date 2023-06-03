import { Lesson } from './../lesson/entities/lesson.entity';
import { Course } from './../course/entities/course.entity';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { Modules } from './entities/module.entity';
import { CourseService } from '../course/course.service';

@Injectable()
export class ModulesService {
  constructor(
    @InjectModel(Modules) private moduleRepository: typeof Modules,
    private readonly courseService: CourseService
  ) {}
  async create(createModuleDto: CreateModuleDto, file: any) {
    try {
      if(!(await this.courseService.findOne(createModuleDto.course_id))){
        throw new BadRequestException("course id does not matched")
      }
        const lesson = await this.moduleRepository.create(createModuleDto);
        return lesson;
    } catch (error) {
      console.log(error);
      if(!error.status){
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
      }
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      return await this.moduleRepository.findAll({
        include: {all: true},
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findCourses(id: string) {
    try {
      console.log("object");
      return await this.moduleRepository.findAll({ where: {course_id: id},
        include: {all: true},
      });
    } catch (error) {
      if(!error.status){
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
      }
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.moduleRepository.findByPk(id, {
        attributes: ['id','course_id', 'title', 'description'],
        include: { all: true },
      });
      if (!data) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (error) {
      if(!error.status){
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
      }
      throw new HttpException(error.message, error.status);
    }
  }


  async update(id: string, updateModuleDto: UpdateModuleDto, file: any) {
    try {
      const data = await this.moduleRepository.findByPk(id);
      if (!data)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);

      if (file) {

        return await this.moduleRepository.update(
          {
            ...updateModuleDto,
          },
          {
            where: { id: id },
          },
        );
      }
      await this.moduleRepository.update(updateModuleDto, {
        where: { id: id },
      });

      return {
        statusCode: 200,
        message: "Updated"
      }
    } catch (error) {
      if(!error.status){
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
      }
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string) {
    try {
      const data = await this.moduleRepository.findByPk(id);
      if (!data)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      return await this.moduleRepository.destroy({ where: { id: id } });
    } catch (error) {
      if(!error.status){
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
      }
      throw new HttpException(error.message, error.status);
    }
  }
}
