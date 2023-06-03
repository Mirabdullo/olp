import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Course } from '../../course/entities/course.entity';
import { Lesson } from '../../lesson/entities/lesson.entity';
import { Modules } from '../../modules/entities/module.entity';
import { Student } from '../../students/entities/student.entity';

@Table({ tableName: 'viewed', timestamps: false })
export class Viewed extends Model<Viewed> {
  @ApiProperty({
    example: '173ef952-79bb-489d-9cfc-62db0d8114b4',
    description: 'Unikal id',
  })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ApiProperty({ example: '173ef952-79bb-489d-9cfc-62db0d8114b4', description: 'Studentning idsi' })
  @ForeignKey(() => Student)
  @Column({
    type: DataType.UUID,
  })
  student_id: string;

  @ApiProperty({ example: '173ef952-79bb-489d-9cfc-62db0d8114b4', description: 'Course idsi' })
  @ForeignKey(() => Course)
  @Column({
    type: DataType.UUID,
  })
  course_id: string;

  @ApiProperty({ example: '[173ef952-79bb-489d-9cfc-62db0d8114b4]', description: 'Korilgan modullar royxati' })
  @ForeignKey(() => Modules)
  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
  modules: Array<string>;

  @ApiProperty({ example: '[173ef952-79bb-489d-9cfc-62db0d8114b4]', description: 'Korilgan darslar royxati' })
  @ForeignKey(() => Lesson)
  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
  lessons: string[];

}
