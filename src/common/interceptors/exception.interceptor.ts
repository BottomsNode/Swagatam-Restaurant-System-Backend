import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, catchError } from "rxjs";
import { RpcBaseException } from "../base-db-ops/exceptions";

@Injectable()
export class RpcGlobalExceptionInterceptor implements NestInterceptor {
    public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((error) => {
                if (error.isRpc && !(error instanceof HttpException)) {
                    throw new HttpException(error.payload, error.status);
                }
                if (error.isPublic && !(error instanceof HttpException)) {
                    throw new HttpException(error.payload, error.status);
                }
                if (error instanceof RpcBaseException) {
                    throw new HttpException(error.getPayload(), error.getStatus());
                }
                throw error;
            }),
        );
    }
}