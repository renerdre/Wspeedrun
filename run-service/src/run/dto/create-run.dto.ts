import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRunDto {
  @ApiProperty({ example: 'uuid-kategori-di-sini' })
  @IsNotEmpty()
  @IsString()
  run_category_id!: string;

  @ApiProperty({ example: 'https://youtube.com/watch?v=123' })
  @IsNotEmpty()
  @IsString()
  vod_url!: string;

  @ApiProperty({ example: 3665, description: 'Durasi dalam detik' })
  @IsNotEmpty()
  @IsNumber()
  run_duration!: number;
}