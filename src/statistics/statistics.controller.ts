import { Statistic } from './entities/statistic.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';

@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @ApiOperation({summary: "Kursning statistik malumotlarini qo'shish"})
  @ApiResponse({status: 201, type: Statistic})
  @Post()
  create(@Body() createStatisticDto: CreateStatisticDto) {
    return this.statisticsService.create(createStatisticDto);
  }

  @ApiOperation({summary: "Statistik malumotlar royxati"})
  @ApiResponse({status: 200, type: [Statistic]})
  @Get()
  findAll() {
    return this.statisticsService.findAll();
  }

  @ApiOperation({summary: "Statistik malumotlarini id orqali bittasini olish"})
  @ApiResponse({status: 200, type: Statistic})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statisticsService.findOne(id);
  }

  @ApiOperation({summary: "Statistik malumotlarini ozgartirish"})
  @ApiResponse({status: 200, type: Statistic})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatisticDto: UpdateStatisticDto) {
    return this.statisticsService.update(id, updateStatisticDto);
  }

  @ApiOperation({summary: "Statistikani ochirish"})
  @ApiResponse({status: 200, type: Statistic})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statisticsService.remove(id);
  }
}
