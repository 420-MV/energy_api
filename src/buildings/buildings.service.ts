import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { Building } from './schemas/building.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class BuildingsService {
  // Injecter Model à l'aide de InjectModel dans le constructeur de BuildingService
  constructor(
    @InjectModel(Building.name) private readonly buildingModel: Model<Building>,
  ) {}
  
  async findAll(): Promise<Building[]> {
    return this.buildingModel.find().exec();
  }
  
  async findOne(id: string): Promise<Building> {
    const building = await this.buildingModel.findById(id).exec();
    if (!building) {
      throw new NotFoundException(`Le bâtiment avec l'ID "${id}" n'existe pas.`);
    }
    return building;
  }

  async create(createBuildingDto: CreateBuildingDto) : Promise<Building> {
    return this.buildingModel.create(createBuildingDto);
  }
  
  async update(id: string, updateBuildingDto: UpdateBuildingDto): Promise<Building> {
    const building = await this.buildingModel
    .findByIdAndUpdate(
      {_id: id},
      { $set: updateBuildingDto },
      {
        new: true,
        runValidators: true,
      },
    )
    .exec();
  
    if (!building) {
      throw new NotFoundException(`Le bâtiment avec l'ID "${id}" n'existe pas.`);
    }
    
    return building;
  }

  async remove(id: string) {
    const deletedBuilding = await this.buildingModel.findByIdAndDelete(id).exec();
    if (!deletedBuilding) {
      throw new NotFoundException(`Le bâtiment avec l'ID "${id}" n'existe pas.`);
    }
  }
}
