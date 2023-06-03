import { Highlight } from './highlights/entities/highlight.entity';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { AdminsModule } from './admins/admins.module';
import { StudentsModule } from './students/students.module';
import { ModuleTestModule } from './module_test/module_test.module';
import { CourseModule } from './course/course.module';

import { LessonModule } from './lesson/lesson.module';

import { RateModule } from './rate/rate.module';
import { EnrolledCourseModule } from './enrolled_course/enrolled_course.module';
import { LikedCourseModule } from './liked_course/liked_course.module';
import { ModulesModule } from './modules/modules.module';
import { ViewedModule } from './viewed/viewed.module';


import { Admin } from './admins/entities/admin.entity';
import { Student } from './students/entities/student.entity';
import { Modules } from './modules/entities/module.entity';
import { Course } from './course/entities/course.entity';
import { Lesson } from './lesson/entities/lesson.entity';
import { Rate } from './rate/entities/rate.entity';
import { EnrolledCourse } from './enrolled_course/entities/enrolled_course.entity';
import { LikedCourse } from './liked_course/entities/liked_course.entity';
import { Viewed } from './viewed/entities/viewed.entity';
import { ModuleTests } from './module_test/entities/module_test.entity';
import { HighlightsModule } from './highlights/highlights.module';
import { StatisticsModule } from './statistics/statistics.module';
import { Statistic } from './statistics/entities/statistic.entity';
import { MinioClientModule } from './minio-client/minio-client.module';
import { AdminStatistikaModule } from './admin_statistika/admin_statistika.module';

console.log(__dirname);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.development.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '..', 'videos'),
    }),


    SequelizeModule.forRootAsync({
      "imports": [ConfigModule],
      "inject": [ConfigService],
      "useFactory": async (config: ConfigService) => ({
        "dialect": 'postgres',
        "host": config.get<string>('POSTGRES_HOST'),
        "port": config.get<number>('POSTGRES_PORT'),
        "username": config.get<string>('POSTGRES_USER'),
        "password": config.get<string>('POSTGRES_PASSWORD'),
        "database": config.get<string>('POSTGRES_DB'),
        "models": [Admin, Student, Modules, Course, Lesson, Rate, EnrolledCourse, LikedCourse, Viewed, ModuleTests, Statistic, Highlight],
        "createDatabaseIfNotExist": true,
        "autoLoadModels": true,
        "synchronize": true,
        "logging": false,
        "alter": true
      }),
    }),

    AdminsModule,
    StudentsModule,
    ModuleTestModule,
    CourseModule,

    LessonModule,

    RateModule,

    EnrolledCourseModule,

    LikedCourseModule,

    ModulesModule,

    ViewedModule,

    HighlightsModule,

    StatisticsModule,

    MinioClientModule,

    AdminStatistikaModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
