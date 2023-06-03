import { Controller, Get,} from '@nestjs/common';
import { AdminStatistikaService } from './admin_statistika.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Statistika-dashboard")
@Controller('admin-statistika')
export class AdminStatistikaController {
  constructor(private readonly adminStatistikaService: AdminStatistikaService) {}


  @ApiOperation({summary: "Umumiy sotib olingan kurslar"})
  @ApiResponse({status: 200, type: Array})
  @Get('enrolled')
  enrolled() {
    return this.adminStatistikaService.student()
  }

  @ApiOperation({ summary: 'Umumiy kurslar soni' })
  @ApiResponse({ status: 200, type: Object })
  @Get('courses')
  courses() {
    return this.adminStatistikaService.courses()
  }

  @ApiOperation({summary: "Studentlar statistikasi"})
  @ApiResponse({status: 200, type: Object})
  @Get('students')
  student() {
    return this.adminStatistikaService.student()
  }
  


}
