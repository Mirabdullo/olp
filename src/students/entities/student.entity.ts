import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { EnrolledCourse } from '../../enrolled_course/entities/enrolled_course.entity';
import { LikedCourse } from '../../liked_course/entities/liked_course.entity';

@Table({ tableName: 'student', timestamps: true, paranoid: true })
export class Student extends Model<Student> {
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

  @ApiProperty({ example: 'Akmal', description: 'Studentning ismi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @ApiProperty({ example: 'Karimov', description: 'Studentning familiyasi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @ApiProperty({
    example: 'akmal@gmail.com',
    description: 'Studentning emaili',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({ example: '#$H@#J@#', description: 'Studentning paroli' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;



  @ApiProperty({ type: 'string', format: "binary", description: 'Studentning profil rasmi' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image: string;


  @ApiProperty({
    example: 'true / false',
    description: "Student ban yoki yo'qligi",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_active: boolean;

  @HasMany(() => EnrolledCourse)
  enrolledCourse: EnrolledCourse[];

  @HasMany(() => LikedCourse)
  likedCourse: LikedCourse[];
}
