import { RpcInternalServerErrorException } from './base';

export class DbException extends RpcInternalServerErrorException {
  constructor(objectOrError?: string | object, description = 'Database Error') {
    super(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      typeof objectOrError !== 'object'
        ? objectOrError
        : objectOrError['message'],
      description,
    );
  }
}
