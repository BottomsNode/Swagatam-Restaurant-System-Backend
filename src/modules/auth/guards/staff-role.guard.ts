import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/sys.role.decorators';
import { STAFF_ROLES } from '../dto/all.roles.dto';
import { Request } from 'express';
import { RequestUser } from '@/common/interceptors/logging.interceptor';

@Injectable()
export class StaffRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<STAFF_ROLES[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: RequestUser }>();
    const user = request.user;

    if (!user?.role) return false;

    return requiredRoles.some((role) => role === (user.role as STAFF_ROLES));
  }
}
