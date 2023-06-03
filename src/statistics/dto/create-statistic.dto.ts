import { IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsUUID, IsString } from 'class-validator';

export class CreateStatisticDto {
  @ApiProperty({
    example: '1000$',
    description: 'Statistics salary',
  })
  @IsNotEmpty()
  @IsString()
  salary: string;

  @ApiProperty({
    example: '34%',
    description: 'Statistics salar increase',
  })
  @IsNotEmpty()
  @IsString()
  salar_increase: string;

  @ApiProperty({
    example: '3-4 years',
    description: 'Statistics complate time',
  })
  @IsNotEmpty()
  @IsString()
  complete_time: string;

  @ApiProperty({
    example: '100',
    description: 'Countries',
  })
  @IsNotEmpty()
  @IsString()
  countries: string;
}
