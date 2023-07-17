import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokensService } from '../tokens/tokens.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login-auth.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Request, Response } from 'express';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admin) private adminRepository: typeof Admin,
    private readonly tokenService: TokensService,
    private readonly jwtService: JwtService,
  ) { }
  async signup(createAdminDto: CreateAdminDto, res: Response) {
    try {
      const condidate = await this.adminRepository.findOne({
        where: { email: createAdminDto.email },
      });
      if (condidate) {
        return new HttpException(
          'Bunday foydalanuvchi mavjud',
          HttpStatus.BAD_REQUEST,
        );
      }

      const hashedPassword = await bcrypt.hash(createAdminDto.password, 7);

      const admin = await this.adminRepository.create({
        ...createAdminDto,
        password: hashedPassword,
      });

      const payload = {
        id: admin.id,
        email: admin.email,
        is_active: admin.is_active,
        role: 'admin',
      };

      const tokens = await this.tokenService.getTokens(payload);


      return {
        access_token: tokens.access_token,

      };
    } catch (error) {
      console.log(error);
      if (!error.status) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
      }
      throw new HttpException(error.message, error.status);
    }
  }

  async signin(loginDto: LoginDto, res: Response) {
    try {
      const { email, password } = loginDto;

      const admin = await this.adminRepository.findOne({
        where: { email: email },
      });

      if (!email)
        throw new BadRequestException(
          "Ma'lumotlar topilmadi ro'yxatdan o'ting",
        );

      const passwordMatches = await bcrypt.compare(password, admin.password);
      if (!passwordMatches) throw new BadRequestException("password noto'g'ri");

      await this.adminRepository.update(
        {
          is_active: true,
        },
        {
          where: { id: admin.id },
          returning: true,
        },
      );
      const updatedAdmin = await this.adminRepository.findByPk(admin.id);
      const payload = {
        id: updatedAdmin.id,
        email: updatedAdmin.email,
        is_active: updatedAdmin.is_active,
        role: 'admin',
      };

      const tokens = await this.tokenService.getTokens(payload);

      return {
        is_admin: true,
        access_token: tokens.access_token,
      };
    } catch (error) {
      console.log(error);
      if (!error.status) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
      }
      throw new HttpException(error.message, error.status);
    }
  }

  async logout(req: Request) {
    try {
      let token = req.headers.authorization;
      if (!token) {
        throw new UnauthorizedException('Not found token');
      }
      token = token.split(' ')[1];
      const admin = this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });

      return await this.adminRepository.update(
        {
          is_active: false,
        },
        { where: { id: admin.id } },
      );
    } catch (error) {
      console.log(error);
      if (error.message.includes('invalid signature')) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      } else if (error.message.includes('jwt expired')) {
        throw new HttpException('Jwt expired', HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      return await this.adminRepository.findAll({
        include: {all: true},
      });
    } catch (error) {
      console.log(error);
      if (!error.status) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
      }
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(req: Request) {
    try {
      let token = req.headers.authorization;
      if (!token) throw new UnauthorizedException('Token not found');
      token = token.split(' ')[0];

      const admin = await this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });

      return await this.adminRepository.findByPk(admin.id);
    } catch (error) {
      console.log(error);
      if (error.message.includes('invalid signature')) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      } else if (error.message.includes('jwt expired')) {
        throw new HttpException('Jwt expired', HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException(error.message, error.status);
    }
  }

  async update(req: Request, updateAdminDto: UpdateAdminDto) {
    try {
      let token = req.headers.authorization;
      if (!token) {
        throw new UnauthorizedException('Not found token');
      }
      token = token.split(' ')[1];
      const admin = this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });

      await this.adminRepository.update(updateAdminDto, {
        where: { id: admin.id },
      });

      return {
        statusCode: 200,
        message: 'Updated',
      };
    } catch (error) {
      console.log(error);
      if (error.message.includes('invalid signature')) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      } else if (error.message.includes('jwt expired')) {
        throw new HttpException('Jwt expired', HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string) {
    try {
      const admin = await this.adminRepository.findByPk(id);
      if (!admin) throw new BadRequestException("Ma'lumotlar topilmadi");

      await this.adminRepository.destroy({
        where: { id },
      });

      return {
        status: 200,
        message: 'Deleted',
      };
    } catch (error) {
      console.log(error);
      if (!error.status) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
      }
      throw new HttpException(error.message, error.status);
    }
  }
}
