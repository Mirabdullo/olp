import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { Modules } from './entities/module.entity';

@ApiTags('Modules')
@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @ApiOperation({ summary: 'Module yaratish' })
  @ApiResponse({ status: 201, type: Modules })
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  create(@Body() createModuleDto: CreateModuleDto, @UploadedFile() file: any) {
    return this.modulesService.create(createModuleDto, file);
  }

  @ApiOperation({ summary: 'Modulelar royxati' })
  @ApiResponse({ status: 200, type: [Modules] })
  @Get()
  findAll() {
    return this.modulesService.findAll();
  }

  @ApiOperation({ summary: 'Modulelar royxati' })
  @ApiResponse({ status: 200, type: [Modules] })
  @Get('modules/:id')
  findCourses(@Param('id') id: string) {
    return this.modulesService.findCourses(id);
  }


  @ApiOperation({ summary: 'Id orqali bitta moduleni olish' })
  @ApiResponse({ status: 200, type: Modules })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modulesService.findOne(id);
  }

  @ApiOperation({ summary: 'Id orqali bitta moduleni ozgartirish' })
  @ApiResponse({ status: 200, type: Modules })
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateModuleDto: UpdateModuleDto,
    @UploadedFile() file: any,
  ) {
    return this.modulesService.update(id, updateModuleDto, file);
  }

  @ApiOperation({ summary: 'Id orqali bitta moduleni ochirish' })
  @ApiResponse({ status: 200, type: Modules })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modulesService.remove(id);
  }
}
