import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CustomerService } from '../customer/customer.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private customerService: CustomerService,
        private jwtService: JwtService,
    ) { }

    async validateUserCreds(email: string, password: string): Promise<any> {
        const user = await this.customerService.getCustomerByEmail(email);

        if (!user) throw new BadRequestException();

        if (!(await bcrypt.compare(password, user.password)))
            throw new UnauthorizedException();

        return user;
    }
}
