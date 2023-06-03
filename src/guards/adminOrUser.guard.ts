import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AdminOrUser implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const req = context.switchToHttp().getRequest()
            const id = req.params.id
            const authHeader = req.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]
            if(bearer != 'Bearer' || !token) {
                throw new UnauthorizedException({
                    message: "Foydalanuvchi avtorizatsiyadan o'tmagan",
                })
            }
            
            const user = this.jwtService.verify(token,{secret:process.env.ACCESS_TOKEN_KEY})
            if(user.role === 'admin'){
                return true
            }else if(user.role === 'student'){
                return true
            } else {
                throw new UnauthorizedException({
                    message: "Ruxsat etilmagan foydalanuvchi"
                })
            }
        } catch (error) {
            console.log(error);
            if(error.message.includes("invalid signature")){
                throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED)
                } else if(error.message.includes('jwt expired')){
                  throw new HttpException("Jwt expired", HttpStatus.UNAUTHORIZED)
                }
            throw new UnauthorizedException({
                message: "Foydalanuvchi avtorizatsiyadan o'tmagan7",
            })
        }
    }
}