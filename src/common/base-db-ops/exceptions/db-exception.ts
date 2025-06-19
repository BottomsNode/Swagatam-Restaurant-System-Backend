import { RpcInternalServerErrorException } from "./base";

export class DbException extends RpcInternalServerErrorException {
  constructor(objectOrError?: string | object, description = "Database Error") {
    super(typeof objectOrError !== "object" ? objectOrError : objectOrError["message"], description);
  }
}
