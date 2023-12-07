import { AuthService } from './service';

import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { LoginDto } from './dto/login-dto';
import { RegistrationDto } from './dto/registration-dto';
import { LoginReturnDto } from './dto/login-return-dto';

@ApiTags('Auth')
@Controller('')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @ApiOperation({ summary: 'Авторизация' })
    @Post('login')
    login(@Body() dto: LoginDto): Promise<LoginReturnDto> {
        return this.authService.login(dto);
    }

    @ApiOperation({ summary: 'Регистрация' })
    @Post('registration')
    registration(@Body() dto: RegistrationDto): Promise<any> {
        return this.authService.registration(dto);
    }
}
