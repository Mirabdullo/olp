import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Course } from '../../course/entities/course.entity';
import { Lesson } from '../../lesson/entities/lesson.entity';
import { ModuleTests } from '../../module_test/entities/module_test.entity';

@Table({ tableName: 'modules', timestamps: false})
export class Modules extends Model<Modules> {
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

  @ApiProperty({ example: '1', description: 'Course id' })
  @ForeignKey(() => Course)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  course_id: string;

  @ApiProperty({ example: 'Title', description: 'title nomi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({ example: 'Description', description: 'Description nomi' })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;


  @BelongsTo(() => Course)
  course: Course;

  @HasMany(() => Lesson)
  lessons: Lesson[];

  @HasMany(() => ModuleTests)
  test: ModuleTests[];
}
