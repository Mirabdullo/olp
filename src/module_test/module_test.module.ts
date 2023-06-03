import { Module } from '@nestjs/common';
import { ModuleTestService } from './module_test.service';
import { ModuleTestController } from './module_test.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ModuleTests } from './entities/module_test.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([ModuleTests])
  ],
  controllers: [ModuleTestController],
  providers: [ModuleTestService]
})
export class ModuleTestModule {}
