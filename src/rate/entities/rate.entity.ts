import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { Course } from '../../course/entities/course.entity';
import { Student } from '../../students/entities/student.entity';

@Table({ tableName: 'rate', timestamps: false, })
export class Rate extends Model<Rate> {
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

  @ApiProperty({ example: '173ef952-79bb-489d-9cfc-62db0d8114b4', description: 'baholagan studentning idsi' })
  @ForeignKey(() => Student)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  student_id: string;

  @ApiProperty({ example: '173ef952-79bb-489d-9cfc-62db0d8114b4', description: 'Kursning idsi' })
  @ForeignKey(() => Course)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  course_id: string;

  @ApiProperty({ example: '5', description: 'Cursga qoygan bahosi ' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  rate: number;

  @ApiProperty({ example: 'Yaxshi kurs', description: 'Kurs haqida fikri' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @BelongsTo(() => Student)
  student: Student;

  @BelongsTo(() => Course)
  course: Course;
}
