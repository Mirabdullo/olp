import { PartialType } from '@nestjs/swagger';
import { CreateModuleTestDto } from './create-module_test.dto';

export class UpdateModuleTestDto extends PartialType(CreateModuleTestDto) {}
