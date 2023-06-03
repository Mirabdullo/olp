import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Modules } from './entities/module.entity';
import { FilesModule } from '../uploads/files.module';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Modules]),
    FilesModule,
    CourseModule
  ],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [ModulesService]
})
export class ModulesModule {}
