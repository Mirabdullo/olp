import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { Admin } from './entities/admin.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { TokensModule } from '../tokens/tokens.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Admin]),
    TokensModule,
    JwtModule
  ],
  controllers: [AdminsController],
  providers: [AdminsService]
})
export class AdminsModule {}
