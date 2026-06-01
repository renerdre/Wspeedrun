import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; 

export class RegisterDto {
  @ApiProperty({ example: 'username123', description: 'Username antara 4-40 karakter' }) 
  @IsNotEmpty()
  @IsString()
  @MinLength(4, { message: 'Username must be at least 4 characters long.' })
  @MaxLength(40, { message: 'Username must be at most 40 characters long.' })
  username!: string;

  @ApiProperty({ example: 'user@mail.com', description: 'Email unik pengguna' })
  @IsNotEmpty()
  @IsString()
  email!: string;

  @ApiProperty({ example: 'Indonesia', description: 'Negara asal' })
  @IsNotEmpty()
  @IsString()
  country!: string;

  @ApiProperty({ example: 'Password123!', description: 'Password minimal 8 karakter dengan kombinasi besar, kecil, angka, dan simbol' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @MaxLength(40, { message: 'Password must be at most 40 characters long.' })
  password!: string;
}