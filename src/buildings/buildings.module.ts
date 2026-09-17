import { Module } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { BuildingsController } from './buildings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Building, BuildingSchema } from './schemas/building.schema';
import { BuildingsRepository } from './buildings.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Building.name, schema: BuildingSchema }]),
  ],
  controllers: [BuildingsController],
  providers: [BuildingsService, BuildingsRepository],
  exports: [BuildingsService, BuildingsRepository],
})
export class BuildingsModule {}
