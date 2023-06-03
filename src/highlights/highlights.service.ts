import { InjectModel } from '@nestjs/sequelize';
import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { CreateHighlightDto } from './dto/create-highlight.dto';
import { UpdateHighlightDto } from './dto/update-highlight.dto';
import { Highlight } from './entities/highlight.entity';
import { CourseService } from '../course/course.service';

@Injectable()
export class HighlightsService {
  constructor(
    @InjectModel(Highlight) private highlightRepository: typeof Highlight,
    private readonly courseService: CourseService
  ) {}
  async create(createHighlightDto: CreateHighlightDto) {
    try {
      if(!(await this.courseService.findOne(createHighlightDto.course_id))){
        throw new BadRequestException("course id does not matched")
      }
      await this.highlightRepository.create(createHighlightDto);
      return {
        statusCode: 201,
        message: 'Created',
      };
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
      return await this.highlightRepository.findAll({
        attributes: ['id','title', "description"],
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
      const data = await this.highlightRepository.findAll({ where: {course_id: id}
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

  async update(id: string, updateHighlightDto: UpdateHighlightDto) {
    try {
      const highlights = await this.highlightRepository.findByPk(id);
      if (!highlights)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);

      await this.highlightRepository.update(updateHighlightDto, {
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
      const highlights = await this.highlightRepository.findByPk(id);
      if (!highlights)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      return await this.highlightRepository.destroy({ where: { id: id } });
    } catch (error) {
      if(!error.status){
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
      }
      throw new HttpException(error.message, error.status);
    }
  }
}
