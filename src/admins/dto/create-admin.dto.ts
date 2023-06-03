import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAdminDto {
    @ApiProperty({example: 'Akmal', description: 'Adminning ismi'})
    @IsNotEmpty()
    @IsString({message: "firstname must be a string"})
    first_name: string


    @ApiProperty({example: 'Karimov', description: 'Adminning familiyasi'})
    @IsNotEmpty()
    @IsString({message: "firstname must be a string"})
    last_name: string


    @ApiProperty({example: 'akmal@gmail.com', description: 'Adminning emaili'})
    @IsEmail({},{message: "email xato"})
    email: string


    @ApiProperty({example: '#$H@#J@#', description: 'Adminning paroli'})
    @IsNotEmpty()
    @IsString({message: "password must be a string"})
    password: string


    @ApiProperty({example: 'true / false', description: "Admin active yoki yo'qligi"})
    @IsOptional()
    @IsBoolean()
    is_active: boolean


}
