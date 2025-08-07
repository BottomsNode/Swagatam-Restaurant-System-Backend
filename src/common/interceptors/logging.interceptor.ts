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
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>, // explicitly typed
  ): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest<CustomRequest>();

    const method = request.method;
    const url = request.url;
    const user = request.user;

    console.log(
      `[${new Date(now).toISOString()}] Incoming Request: ${method} ${url}`,
    );

    if (user) {
      console.log(
        `Authenticated User: { id: ${user.id}, email: ${user.email}, role: ${user.role} }`,
      );
    } else {
      console.log('Unauthenticated Request');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (request.body && Object.keys(request.body).length > 0) {
      console.log('Request Body:', request.body);
    }

    return next.handle().pipe(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      tap((_response: unknown) => {
        const duration = Date.now() - now;
        console.log(
          `[${new Date().toISOString()}] Completed: ${method} ${url} - ${duration}ms`,
        );
      }),
    );
  }
}
