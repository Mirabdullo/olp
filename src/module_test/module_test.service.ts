import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateModuleTestDto } from './dto/create-module_test.dto';
import { UpdateModuleTestDto } from './dto/update-module_test.dto';
import { ModuleTests } from './entities/module_test.entity';

@Injectable()
export class ModuleTestService {
  constructor(
    @InjectModel(ModuleTests) private testRepository: typeof ModuleTests,
  ) {}
  async create(createModuleTestDto: CreateModuleTestDto) {
    try {
      await this.testRepository.create(createModuleTestDto);
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

  async findAll(id: string) {
    try {
      return await this.testRepository.findAll({
        attributes: [
          'course_id',
          'module_id',
          'question',
          'select_first',
          'select_two',
          'select_three',
          'select_four',
          'answer',
        ],
        where: {id: id}
      
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
      return await this.testRepository.findByPk(id, {
        attributes: [
          'course_id',
          'module_id',
          'question',
          'select_first',
          'select_two',
          'select_three',
          'select_four',
          'answer',
        ],
        
      });
    } catch (error) {
      if(!error.status){
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
      }
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: string, updateModuleTestDto: UpdateModuleTestDto) {
    try {
      const test = await this.testRepository.findByPk(id);
      if (!test)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);

      await this.testRepository.update(updateModuleTestDto, {
        where: { id: id },
        returning: true,
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
      const test = await this.testRepository.findByPk(id);
      if (!test)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);

      return await this.testRepository.destroy({ where: { id: id } });
    } catch (error) {
      if(!error.status){
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
      }
      throw new HttpException(error.message, error.status);
    }
  }
}
