import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RateService } from './rate.service';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Rate } from './entities/rate.entity';

@ApiTags('Rate')
@Controller('rate')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @ApiOperation({ summary: "Reyting qo'shish" })
  @ApiResponse({ status: 201, type: Rate })
  @Post()
  create(@Body() createRateDto: CreateRateDto) {
    return this.rateService.create(createRateDto);
  }

  @ApiOperation({ summary: 'Reytinglar royxati' })
  @ApiResponse({ status: 200, type: [Rate] })
  @Get()
  findAll() {
    return this.rateService.findAll();
  }

  @ApiOperation({ summary: 'Id orqali reytingni chiqarish' })
  @ApiResponse({ status: 200, type: [Rate] })
  @Get('rating/:id')
  rateCourse(@Param('id') id: string) {
    return this.rateService.findOne(id);
  }

  @ApiOperation({ summary: 'Id orqali reytingni chiqarish' })
  @ApiResponse({ status: 200, type: Rate })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rateService.findOne(id);
  }

  @ApiOperation({ summary: 'Id orqali reytingni ozgartirish' })
  @ApiResponse({ status: 200, type: Rate })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRateDto: UpdateRateDto) {
    return this.rateService.update(id, updateRateDto);
  }

  @ApiOperation({ summary: 'Id orqali reytingni ochirish' })
  @ApiResponse({ status: 200, type: Rate })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rateService.remove(id);
  }
}
