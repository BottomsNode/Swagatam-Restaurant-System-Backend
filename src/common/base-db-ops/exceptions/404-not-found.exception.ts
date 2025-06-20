import { HttpStatus } from "@nestjs/common";
import { RpcBaseException, RpcInternalServerErrorException } from "./base";
import { ERROR_STATUS } from "src/common/error/code.status";

export class NotFoundException extends RpcBaseException { 
    constructor(objectOrError?: string | object , description= "NOT FOUND EXCEPTION" ){
        super(objectOrError,HttpStatus.NOT_FOUND,ERROR_STATUS.NOT_FOUND);
    }
}