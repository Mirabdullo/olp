import { InjectModel } from '@nestjs/sequelize';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
import { Statistic } from './entities/statistic.entity';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(Statistic) private statisticRepository: typeof Statistic,
  ) {}
  async create(createStatisticDto: CreateStatisticDto) {
    try {
      await this.statisticRepository.create(createStatisticDto);
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
      return await this.statisticRepository.findAll();
    } catch (error) {
      if(!error.status){
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
      }
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: string) {
    try {
      console.log(typeof id);
      const data = await this.statisticRepository.findByPk(id);
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

  async update(id: string, updateStatisticDto: UpdateStatisticDto) {
    try {
      const statistic = await this.statisticRepository.findByPk(id);
      if (!statistic)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);

      await this.statisticRepository.update(updateStatisticDto, {
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
      const statistic = await this.statisticRepository.findByPk(id);
      if (!statistic)
        throw new HttpException("Ma'lumot topilmadi", HttpStatus.NOT_FOUND);
      return await this.statisticRepository.destroy({ where: { id: id } });
    } catch (error) {
      if(!error.status){
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
      }
      throw new HttpException(error.message, error.status);
    }
  }
}
