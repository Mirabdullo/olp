import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HighlightsService } from './highlights.service';
import { CreateHighlightDto } from './dto/create-highlight.dto';
import { UpdateHighlightDto } from './dto/update-highlight.dto';
import { Highlight } from './entities/highlight.entity';

@ApiTags('HighLights')
@Controller('highlights')
export class HighlightsController {
  constructor(private readonly highlightsService: HighlightsService) {}

  @ApiOperation({ summary: 'Highlights yaratish' })
  @ApiResponse({ status: 201, type: Highlight })
  @Post()
  create(@Body() createHighlightDto: CreateHighlightDto) {
    return this.highlightsService.create(createHighlightDto);
  }

  @ApiOperation({ summary: 'Barcha highlights' })
  @ApiResponse({ status: 200, type: Highlight })
  @Get()
  findAll() {
    return this.highlightsService.findAll();
  }

  @ApiOperation({ summary: 'Course id orqali kursga tegishli Highlights' })
  @ApiResponse({ status: 200, type: [Highlight] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.highlightsService.findOne(id);
  }

  @ApiOperation({ summary: 'Id orqali bitta Highlights malumotlarini ozgartirish' })
  @ApiResponse({ status: 200, type: Highlight })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHighlightDto: UpdateHighlightDto) {
    return this.highlightsService.update(id, updateHighlightDto);
  }

  @ApiOperation({ summary: 'Id orqali bitta Highlights malumotlarini ochirish' })
  @ApiResponse({ status: 200, type: Highlight })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.highlightsService.remove(id);
  }
}
