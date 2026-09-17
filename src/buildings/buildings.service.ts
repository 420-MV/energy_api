import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { Building } from './schemas/building.schema';
import { BuildingsRepository } from './buildings.repository';


@Injectable()
export class BuildingsService {

  constructor(private readonly buildingsRepository: BuildingsRepository) { }

  findAll(): Promise<Building[]> {
    return this.buildingsRepository.findAll();
  }

  async findById(id: string): Promise<Building> {
    const building = await this.buildingsRepository.findById(id);
    if (!building) {
      throw new NotFoundException(`Le bâtiment avec l'ID "${id}" n'existe pas.`);
    }
    return building;
  }

  create(data: CreateBuildingDto): Promise<Building> {
    return this.buildingsRepository.create(data);
  }

  async update(id: string, data: UpdateBuildingDto): Promise<Building> {
    const updatedBuilding = await this.buildingsRepository.update(id, data);
    if (!updatedBuilding) {
      throw new NotFoundException(`Le bâtiment avec l'ID "${id}" n'existe pas.`);
    }
    return updatedBuilding;
  }

  async remove(id: string): Promise<void> {
    const deletedBuilding = await this.buildingsRepository.remove(id);
    if (!deletedBuilding) {
      throw new NotFoundException(`Le bâtiment avec l'ID "${id}" n'existe pas.`);
    }
  }
}