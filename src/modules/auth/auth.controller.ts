import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags(`Auth`)
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Body() loginDto: LoginDto): Promise<any> {
        return this.authService.generateToken(req.user);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('customer')
    async user(@Request() req): Promise<any> {
        return req.user;
    }
}
