import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggingInterceptors implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const now = Date.now();

        // Log incoming request details
        console.log('\n(INTERCEPTOR) >>>>>>>>>>>>>>>>>>>>>>>  INCOMING REQUEST >>>>>>>>>>>>>>>>>>>>>>> ');
        console.log(`[${new Date(now).toISOString()}] ${request.method} ${request.url}`);
        console.log('User:', request.user || 'Unauthenticated');
        // console.log('Headers:', request.headers);
        console.log('Body:', request.body);
        console.log('Query:', request.query);
        console.log('Params:', request.params);

        return next.handle().pipe(
            tap(() => {
                const responseTime = Date.now() - now;
                console.log('\n(INTERCEPTOR) >>>>>>>>>>>>>>>>>>>>>>> REQUEST COMPLETED >>>>>>>>>>>>>>>>>>>>>>> ');
                console.log(`[${new Date().toISOString()}] ${request.method} ${request.url} - ${responseTime}ms`);
            })
        );
    }
}