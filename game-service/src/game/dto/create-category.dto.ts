import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Masukkan-UUID-Game-Disini', description: 'ID Game yang valid dari tabel games' })
  @IsNotEmpty({ message: 'Game id must exist.' })
  @IsString()
  game_id!: string;

  @ApiProperty({ example: 'Any% Glitchless' })
  @IsNotEmpty({ message: 'Run category name must be filled.' })
  @IsString()
  run_category_name!: string;
}