import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'; // Menggunakan pustaka bcrypt

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { username, email, country, password } = registerDto;

    let atCount = 0;
    let dotCount = 0;
    for (let i = 0; i < email.length; i++) {
      if (email[i] === '@') atCount++;
      if (email[i] === '.') dotCount++;
    }
    if (atCount !== 1 || dotCount < 1) {
      throw new BadRequestException('Email must contain exactly one @ and at least one dot.');
    }
    if (email.includes('@.') || email.includes('.@')) {
      throw new BadRequestException('@ and dot characters cannot be adjacent.');
    }

    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSpecial = false;
    const specialChars = "!@#$%^&*()_+-=[]{}|;':,./<>?";

    for (let i = 0; i < password.length; i++) {
      const char = password[i];
      if (char >= 'A' && char <= 'Z') hasUpper = true;
      else if (char >= 'a' && char <= 'z') hasLower = true;
      else if (char >= '0' && char <= '9') hasNumber = true;
      else if (specialChars.includes(char)) hasSpecial = true;
    }
    if (!hasUpper || !hasLower || !hasNumber || !hasSpecial) {
      throw new BadRequestException('Password must contain uppercase, lowercase, number, and special character.');
    }

    const existingUser = await this.prisma.users.findFirst({
      where: { email: email },
    });
    if (existingUser) {
      throw new BadRequestException('Email is already registered.');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await this.prisma.users.create({
      data: {
        username: username,
        email: email,
        country: country,
        password: hashedPassword,
        role: 'USER',
      },
    });

    return { message: 'User registered successfully.' };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.prisma.users.findFirst({
      where: { email: email },
    });
    if (!user) {
      throw new BadRequestException('Invalid email or password.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password.');
    }

    const payload = { id: user.user_id, role: user.role };
    const access_token = await this.jwtService.signAsync(payload);

    return { access_token: access_token };
  }

  async getProfile(id: string) {
    const user = await this.prisma.users.findUnique({
      where: { user_id: id },
      select: {
        username: true,
        email: true,
        country: true,
        role: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }
}