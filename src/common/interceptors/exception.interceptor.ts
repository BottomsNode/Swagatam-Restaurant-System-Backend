import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { RpcBaseException } from '../base-db-ops/exceptions';

interface RpcErrorLike {
  isRpc?: boolean;
  isPublic?: boolean;
  payload?: string | Record<string, any>;
  status?: number;
}

@Injectable()
export class RpcGlobalExceptionInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    return next.handle().pipe(
      catchError((err: unknown) => {
        const error = err as RpcErrorLike;

        if (error.isRpc && !(err instanceof HttpException)) {
          throw new HttpException(
            error.payload ?? 'Internal Error',
            error.status ?? 500,
          );
        }

        if (error.isPublic && !(err instanceof HttpException)) {
          throw new HttpException(
            error.payload ?? 'Internal Error',
            error.status ?? 500,
          );
        }

        if (err instanceof RpcBaseException) {
          throw new HttpException(err.getPayload(), err.getStatus());
        }

        throw err;
      }),
    );
  }
}
