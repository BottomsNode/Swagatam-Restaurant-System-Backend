import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import * as express from 'express';
import { USER_ROLES } from '@/modules/auth/dto/all.roles.dto';

export interface RequestUser {
  id: number;
  email: string;
  role: string | USER_ROLES;
  permissions?: string[];
}

export interface CustomRequest extends express.Request {
  user?: RequestUser;
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest<CustomRequest>();

    const method = request.method;
    const url = request.url;

    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now;
        console.log(
          `[${new Date().toISOString()}] ${method} ${url} - ${responseTime}ms`,
        );
      }),
    );
  }
}
