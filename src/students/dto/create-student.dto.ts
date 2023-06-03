import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateStudentDto {
    @ApiProperty({example: 'Akmal', description: 'Studentning ismi'})
    @IsNotEmpty()
    @IsString({message: "firstname must be a string"})
    first_name: string


    @ApiProperty({example: 'Karimov', description: 'Studentning familiyasi'})
    @IsNotEmpty()
    @IsString({message: "firstname must be a string"})
    last_name: string


    @ApiProperty({example: 'akmal@gmail.com', description: 'Studentning emaili'})
    @IsEmail({},{message: "email xato"})
    email: string


    @ApiProperty({example: '#$H@#J@#', description: 'Studentning paroli'})
    @IsNotEmpty()
    @IsString({message: "password must be a string"})
    password: string



    @ApiProperty({ type: "string",format: "binary", required: false, description: 'Studentning rasmi'})
    @IsOptional()
    @IsString()
    image: string
}
