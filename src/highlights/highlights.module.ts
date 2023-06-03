import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { HighlightsService } from './highlights.service';
import { HighlightsController } from './highlights.controller';
import { Highlight } from './entities/highlight.entity';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Highlight]),
    CourseModule
  ],
  controllers: [HighlightsController],
  providers: [HighlightsService]
})
export class HighlightsModule {}
