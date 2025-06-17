import {
    CanActivate, ExecutionContext, Injectable} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            return true
        } catch (error) {
            return error;
        }
    }
}