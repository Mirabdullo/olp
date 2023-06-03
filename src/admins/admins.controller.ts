import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginDto } from './dto/login-auth.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';

@ApiTags('Admin')
@Controller('admin')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @ApiOperation({ summary: 'Admin uchun signup qilishi' })
  @ApiResponse({ status: 201, type: Admin })
  @Post('signup')
  signup(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminsService.signup(createAdminDto, res);
  }

  @ApiOperation({ summary: 'Admin uchun signin qilish' })
  @ApiResponse({ status: 200, type: LoginDto })
  @Post('signin')
  signin(
    @Body() loginAdminDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminsService.signin(loginAdminDto, res);
  }

  @ApiOperation({ summary: 'Admin logout qilish' })
  @ApiResponse({ status: 200, type: Admin })
  @Get('logout')
  logout(@Req() req: Request) {
    return this.adminsService.logout(req);
  }

  @ApiOperation({ summary: 'Barcha adminlar royxati' })
  @ApiResponse({ status: 200, type: Admin })
  @Get('all')
  findAll() {
    return this.adminsService.findAll();
  }

  @ApiOperation({ summary: 'Adminning shaxsiy malumotlari' })
  @ApiResponse({ status: 200, type: Admin })
  @ApiBearerAuth()
  @Get()
  findOne(@Req() req: Request) {
    return this.adminsService.findOne(req);
  }


  @ApiOperation({ summary: 'Update admin data by token' })
  @ApiResponse({ status: 200, type: Admin })
  @Patch('update')
  update(@Req() req: Request, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(req, updateAdminDto);
  }
}
