import { Course } from './../../course/entities/course.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'highlight', timestamps: false })
export class Highlight extends Model<Highlight> {
    @ApiProperty({ example: '173ef952-79bb-489d-9cfc-62db0d8114b4', description: 'Unikal id' })
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @ApiProperty({ example: '173ef952-79bb-489d-9cfc-62db0d8114b4', description: 'Course id' })
    @ForeignKey(() => Course)
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    course_id: string;

    @ApiProperty({ example: 'Guided study plans', description: 'Course highlights' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @ApiProperty({ example: 'Topic-by-topic lectures, and the flexibility to download notes', description: 'highlights description' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: string;

}
