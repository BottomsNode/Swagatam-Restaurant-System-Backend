import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/sys.role.decorators';
import { USER_ROLES } from '../dto/all.roles.dto';
import { RequestUser } from '@/common/interceptors/logging.interceptor';
import { Request } from 'express';

@Injectable()
export class SystemRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<USER_ROLES[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as RequestUser;

    return requiredRoles.includes(user.role as USER_ROLES);
  }
}
