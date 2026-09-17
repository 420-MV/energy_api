import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Building } from './schemas/building.schema';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';

@Injectable()
export class BuildingsRepository {
  constructor(
    @InjectModel(Building.name) private readonly buildingModel: Model<Building>
  ) {}

  async findAll(): Promise<Building[]> {
    return this.buildingModel.find().exec();
  }

  async findById(id: string): Promise<Building | null> {
    return this.buildingModel.findById(id).exec();
  }

  async create(data: CreateBuildingDto): Promise<Building> {
    return this.buildingModel.create(data);
  }

  async update(id: string, data: UpdateBuildingDto): Promise<Building | null> {
    return this.buildingModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async remove(id: string): Promise<Building | null> {
    return this.buildingModel.findByIdAndDelete(id).exec();
  }
}