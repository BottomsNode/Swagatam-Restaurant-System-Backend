import { isNilOrEmpty } from "../utils";
import { ArgumentsHost, Catch, HttpException, RpcExceptionFilter } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { Observable, throwError } from "rxjs";
import { RpcBaseException, RpcInternalServerErrorException } from "../exceptions";

const EVENT_NAME_INDEX = 2;

@Catch()
export class RpcGlobalExceptionFilter<T = any, R = any> implements RpcExceptionFilter<T, R> {
  constructor(@InjectPinoLogger(RpcGlobalExceptionFilter.name) private logger: PinoLogger) {}

  public catch(exception: T, _host: ArgumentsHost): Observable<R> {
    const rpcEx: RpcBaseException = exception instanceof RpcException ? this.normalizeRpcException(exception) : this.createRpcException(exception);
    const err = rpcEx.getError();

    // TODO: Need test for different exception types
    const eventName = _host.getArgByIndex(1)?.getArgByIndex(EVENT_NAME_INDEX);
    this.logger.error(err["payload"], `${!isNilOrEmpty(eventName) ? `eventName: ${eventName}` : "Unknown"}`);

    return throwError(() => err);
  }

  protected normalizeRpcException(exception: RpcException): RpcBaseException {
    return exception instanceof RpcBaseException ? exception : new RpcInternalServerErrorException(exception.getError());
  }

  protected createRpcException(exception: T): RpcBaseException {
    if (exception instanceof HttpException) {
      return new RpcBaseException(exception.getResponse(), exception.getStatus(), exception.name);
    }
    this.logger.error(exception);
    if (exception instanceof Error && !isNilOrEmpty(exception.message)) {
      return new RpcInternalServerErrorException(exception.message);
    }
    return new RpcInternalServerErrorException(exception as any);
  }
}
