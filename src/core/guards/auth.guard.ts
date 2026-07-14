import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt/dist/jwt.service";




@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> 
    {
        const request =  context.switchToHttp().getRequest();
        let {token}=request.headers;
        if(!token) {
            throw new UnauthorizedException('Token not found');
        }
        try {
     
      const payload = await this.jwtService.verify(token, {secret:"ahmed"});
      
      request.user= payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
        
    }
}