import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";


export class CreateHighlightDto {
    @ApiProperty({ example: 'Guided study plans', description: 'Highlight title' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ example: 'Guided studys plans', description: 'Highlight description' })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({ example: '0349ruf23rrd4rqwq323erw32', description: 'Course id' })
    @IsNotEmpty()
    @IsUUID()
    course_id: string;
}
