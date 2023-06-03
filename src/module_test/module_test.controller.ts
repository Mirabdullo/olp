import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ModuleTestService } from './module_test.service';
import { CreateModuleTestDto } from './dto/create-module_test.dto';
import { UpdateModuleTestDto } from './dto/update-module_test.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ModuleTests } from './entities/module_test.entity';

@ApiTags('Module testlari')
@Controller('module-test')
export class ModuleTestController {
  constructor(private readonly moduleTestService: ModuleTestService) {}

  @ApiOperation({ summary: 'Test yaratish' })
  @ApiResponse({ status: 201, type: ModuleTests })
  @Post()
  create(@Body() createModuleTestDto: CreateModuleTestDto) {
    let found = false
    createModuleTestDto.answers.forEach(element => {
      if(element['isCorrect'] == true){
        found = true
      }
    });
    if(found){
        return this.moduleTestService.create(createModuleTestDto);
    }else {
      throw new HttpException("To'gri javob kiritilmadi",HttpStatus.BAD_REQUEST)
    }
  }

  @ApiOperation({ summary: 'Module idsi orqali modulega tegishli testlar royxati' })
  @ApiResponse({ status: 200, type: [ModuleTests] })
  @Get('moduletest/:id')
  findAll(@Param('id') id: string) {
    return this.moduleTestService.findAll(id);
  }

  @ApiOperation({ summary: 'id orqali bitta test malumotlari' })
  @ApiResponse({ status: 200, type: ModuleTests })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moduleTestService.findOne(id);
  }

  @ApiOperation({ summary: 'Testni ozgartirish' })
  @ApiResponse({ status: 200, type: ModuleTests })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateModuleTestDto: UpdateModuleTestDto,
  ) {
    return this.moduleTestService.update(id, updateModuleTestDto);
  }

  @ApiOperation({ summary: 'Testni ochirish' })
  @ApiResponse({ status: 200, type: ModuleTests })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moduleTestService.remove(id);
  }
}
