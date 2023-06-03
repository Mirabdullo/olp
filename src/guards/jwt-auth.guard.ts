import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const req = context.switchToHttp().getRequest()
            const id = req.params.id
            const authHeader = req.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]
            console.log(bearer)
            console.log(token);
            console.log(bearer != 'Bearer' || !token);
            if(bearer != 'Bearer' || !token) {
                throw new UnauthorizedException({
                    message: "Foydalanuvchi avtorizatsiyadan o'tmagan",
                })
            }
            console.log(1);
            const user = this.jwtService.verify(token,{secret:process.env.ACCESS_TOKEN_KEY})

            if(user.sub !== +id){
                throw new UnauthorizedException({
                    message: "Ruxsat etilmagan foydalanuvchi"
                })
            }
            console.log("object");
            return true
        } catch (error) {
            console.log(error);
            throw new UnauthorizedException({
                message: "Foydalanuvchi avtorizatsiyadan o'tmagan7",
            })
        }
    }
}