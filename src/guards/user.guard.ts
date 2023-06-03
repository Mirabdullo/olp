import { StudentsService } from './../students/students.service';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class UserGuards implements CanActivate {
  constructor(private readonly jwtService: JwtService,
    private studentService: StudentsService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: "Foydalanuvchi avtorizatsiyadan o'tmagan",
        });
      }
      const user = this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
      console.log( this.studentService.findOne(user.id));
      if (user.role !== 'student') {
        throw new UnauthorizedException({
          message: 'Foydalanuvchiga ruxsat etilmagan',
        });
      }

      return true;
    } catch (error) {
      if(error.message.includes("invalid signature")){
        throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED)
        } else if(error.message.includes('jwt expired')){
          throw new HttpException("Jwt expired", HttpStatus.UNAUTHORIZED)
        }
      throw new HttpException(
        'Foydalanuvchiga ruxsat etilmagan',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
