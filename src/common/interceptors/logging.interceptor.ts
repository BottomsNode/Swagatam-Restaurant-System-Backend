import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';

export interface RequestUser {
  id: number;
  email: string;
  role: string;
  permissions?: string[];
}
type CustomRequest = Request & { user?: RequestUser };

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
