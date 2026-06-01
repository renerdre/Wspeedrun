import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGameDto {
  @ApiProperty({ example: 'Minecraft' })
  @IsNotEmpty({ message: 'Game name must be filled.' })
  @IsString()
  game_name!: string;

  @ApiProperty({ example: 'A sandbox game about placing blocks.' })
  @IsNotEmpty({ message: 'Game description must be filled.' })
  @IsString()
  description!: string;
}