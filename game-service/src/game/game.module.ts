import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: 'wspeedrun-secret-key-2026',
    }),
  ],
  controllers: [GameController],
  providers: [GameService, JwtStrategy], // Tambahkan JwtStrategy di sini
})
export class GameModule {}