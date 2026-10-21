import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
@ApiTags('Authentication') @Controller('auth')
export class AuthController {
 constructor(private readonly service:AuthService) {}
 @Post('register') register(@Body() dto:RegisterDto){return this.service.register(dto)}
 @HttpCode(HttpStatus.OK) @Post('login') login(@Body() dto:LoginDto){return this.service.login(dto)}
}
