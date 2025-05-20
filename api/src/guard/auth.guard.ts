import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as cookie from 'cookie';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies['token'];

    if (!token) {
      throw new UnauthorizedException('Token missing');
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET!,
      });

      req.user_id = payload?.user_id;
      req.username = payload?.username;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
