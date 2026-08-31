import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { BuildingsModule } from './buildings/buildings.module';

@Module({
  imports: [HealthModule, BuildingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
