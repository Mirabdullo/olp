import { PartialType } from '@nestjs/swagger';
import { CreateViewedDto } from './create-viewed.dto';

export class UpdateViewedDto extends PartialType(CreateViewedDto) {}
