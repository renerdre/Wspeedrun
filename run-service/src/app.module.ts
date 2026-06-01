import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { RunModule } from './run/run.module';

@Module({
  imports: [PrismaModule, RunModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
