import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class LoggingInterceptors implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>{
        const req = context.switchToHttp().getRequest();
        console.log('User Request Data:', req.user);
        return next.handle();
    }
}