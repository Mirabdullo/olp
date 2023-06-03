
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Course } from '../../course/entities/course.entity';


@Table({ tableName: 'statistic', timestamps: false })
export class Statistic extends Model<Statistic> {
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

  @ApiProperty({ example: '1000$', description: 'Statistics salary' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  salary: string;

  @ApiProperty({ example: '34%', description: 'Statistics salar increase' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  salar_increase: string;

  @ApiProperty({ example: '3-4 years', description: 'Statistics complate time' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  complete_time: string;

  @ApiProperty({ example: '100', description: 'Statistics country' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  countries: string;

  @ApiProperty({ example: '100', description: 'Statistics country' })
  @ForeignKey(() => Course)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  course_id: string;
}
