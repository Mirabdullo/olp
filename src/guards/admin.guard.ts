import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService,
        private readonly reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const req = context.switchToHttp().getRequest()
            const id = req.params.id
            const authHeader = req.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]
            if(bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({
                    message: "Foydalanuvchi avtorizatsiyadan o'tmagan",
                })
            }
            const admin = this.jwtService.verify(token,{secret: process.env.ACCESS_TOKEN_KEY})
            if(admin.role === "admin"){
                return true
            }else {
                throw new UnauthorizedException({
                    message: "Ruxsat etilmagan foydalanuvchi"
                })
            }
        } catch (error) {
            if(error.message.includes("invalid signature")){
                throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED)
                } else if(error.message.includes('jwt expired')){
                  throw new HttpException("Jwt expired", HttpStatus.UNAUTHORIZED)
                }
            throw new HttpException(
                "Ruxsat etilmagan foydalanuvchi",
                HttpStatus.FORBIDDEN
            )
        }
    }
}