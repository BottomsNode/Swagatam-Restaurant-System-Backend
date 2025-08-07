import { HttpStatus } from '@nestjs/common';
import { RpcBaseException } from './base';
import { ERROR_STATUS } from '@/common/error/code.status';

export class NotFoundException extends RpcBaseException {
  constructor(
    objectOrError?: string | object,
    description = 'NOT FOUND EXCEPTION',
  ) {
    super(
      objectOrError,
      HttpStatus.NOT_FOUND,
      ERROR_STATUS.NOT_FOUND || description,
    );
  }
}
