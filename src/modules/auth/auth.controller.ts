import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomerResponseDto } from '../customer/dto/customer.res.dto';
import { LoginCustomerDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { CreateCustomerDto } from '../customer/dto/customer.create.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags(`Customer Auth`)
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() createDto: CreateCustomerDto): Promise<CustomerResponseDto> {
        return this.authService.register(createDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() loginDto: LoginCustomerDto): Promise<{ access_token: string }> {
        return this.authService.login(loginDto);
    }
}
