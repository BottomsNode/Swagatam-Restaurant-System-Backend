import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';
import { USER_ROLES } from '@/modules/auth/dto/all.roles.dto';

// Define the user interface
export interface RequestUser {
  id: number;
  email: string;
  role: string | USER_ROLES;
  permissions?: string[];
}

// Define a custom request interface
interface CustomRequest extends Request {
  user?: RequestUser;
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    const request = context.switchToHttp().getRequest<CustomRequest>();

    // Log incoming request details
    console.log(
      '\n(INTERCEPTOR) >>>>>>>>>>>>>>>>>>>>>>> INCOMING REQUEST >>>>>>>>>>>>>>>>>>>>>>>',
    );
    console.log(
      `[${new Date(now).toISOString()}] ${request.method} ${request.url}`,
    );
    console.log('User:', request.user ?? 'Unauthenticated');
    console.log('Body:', request.body);
    console.log('Query:', request.query);
    console.log('Params:', request.params);

    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now;
        console.log(
          '\n(INTERCEPTOR) >>>>>>>>>>>>>>>>>>>>>>> REQUEST COMPLETED >>>>>>>>>>>>>>>>>>>>>>>',
        );
        console.log(
          `[${new Date().toISOString()}] ${request.method} ${request.url} - ${responseTime}ms`,
        );
      }),
    );
  }
}
