// src/auth/roles.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import * as cookie from 'cookie';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from '../decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndMerge<string[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const cookieHeader = request.headers.cookie;
    const cookies = cookieHeader ? cookie.parse(cookieHeader) : {};

    const userRole = cookies['role'];

    if (!userRole || !requiredRoles.includes(userRole)) {
      throw new ForbiddenException('Permission denied');
    }

    return true;
  }
}
