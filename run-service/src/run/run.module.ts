import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RunService } from './run.service';
import { RunController } from './run.controller';
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
  controllers: [RunController],
  providers: [RunService, JwtStrategy],
})
export class RunModule {}