import { Module } from '@nestjs/common';
import { RateService } from './rate.service';
import { RateController } from './rate.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Rate } from './entities/rate.entity';
import { Course } from '../course/entities/course.entity';
import { Student } from '../students/entities/student.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Rate, Course, Student])
  ],
  controllers: [RateController],
  providers: [RateService]
})
export class RateModule {}
