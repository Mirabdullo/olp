import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Course } from '../../course/entities/course.entity';
import { Modules } from '../../modules/entities/module.entity';
import { DataTypes } from 'sequelize';

@Table({ tableName: 'module_test', timestamps: false })
export class ModuleTests extends Model<ModuleTests> {
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

  @ApiProperty({ example: '1', description: 'Qaysi coursega tegishliligi' })
  @ForeignKey(() => Course)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  course_id: string;

  // @ApiProperty({ example: '1', description: 'Qaysi modulega tegishliligi' })
  // @ForeignKey(() => Modules)
  // @Column({
  //   type: DataType.UUID,
  //   allowNull: false,
  // })
  // module_id: string;

  @ApiProperty({
    example: 'Dasturlash nima?',
    description: 'Test savoli',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  question: string;

  @ApiProperty({ example: 'Dasturlash', description: ' Birinchi variant' })
  @Column({
    type: DataType.ARRAY(DataTypes.JSON),
    allowNull: false,
  })
  answers: Array<object>;

}
