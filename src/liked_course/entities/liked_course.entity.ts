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

@Table({ tableName: 'liked_course', timestamps: false })
export class LikedCourse extends Model<LikedCourse> {
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

  @ApiProperty({ example: '2', description: 'Student id' })
  @ForeignKey(() => Student)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  student_id: string;

  @ApiProperty({ example: '2', description: 'Course id' })
  @ForeignKey(() => Course)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  course_id: string;

  @BelongsTo(() => Course)
  course: Course;
}
