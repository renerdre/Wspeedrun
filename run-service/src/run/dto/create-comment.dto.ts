import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'uuid-run-di-sini' })
  @IsNotEmpty()
  @IsString()
  run_id!: string;

  @ApiProperty({ example: 'uuid-user-di-sini' })
  @IsNotEmpty()
  @IsString()
  user_id!: string;

  @ApiProperty({ example: 'Wow, perfect execution!' })
  @IsNotEmpty()
  @IsString()
  comment!: string;
}
