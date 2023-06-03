import { FilesModule } from './../uploads/files.module';
import { Module } from "@nestjs/common";
import { StudentsService } from "./students.service";
import { StudentsController } from "./students.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Student } from "./entities/student.entity";
import { JwtModule } from "@nestjs/jwt";
import { TokensModule } from "../tokens/tokens.module";
import { LikedCourse } from "../liked_course/entities/liked_course.entity";
import { EnrolledCourse } from "../enrolled_course/entities/enrolled_course.entity";

@Module({
  imports: [SequelizeModule.forFeature([Student, LikedCourse, EnrolledCourse]), TokensModule, JwtModule, FilesModule],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService]
})
export class StudentsModule {}
