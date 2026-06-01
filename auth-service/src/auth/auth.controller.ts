import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger'; 

@ApiTags('Auth & Users') 
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/register')
  @ApiOperation({ summary: 'Registrasi pengguna baru' }) 
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('auth/login')
  @ApiOperation({ summary: 'Login untuk mendapatkan token akses JWT' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('users/:id/profile')
  @ApiOperation({ summary: 'Melihat profil pengguna berdasarkan ID' })
  getProfile(@Param('id') id: string) {
    return this.authService.getProfile(id);
  }
}