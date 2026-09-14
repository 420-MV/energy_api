import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { Building } from './entities/building.entity';

@Injectable()
export class BuildingsService {
  private readonly buildings: Building[] = [];
  
  findAll(): Building[] {
    return this.buildings;
  }
  
  findOne(id: string): Building {
    const index: number = this.findBuildingIndex(id);

    return this.buildings.at(index)!;
  }

  create(createBuildingDto: CreateBuildingDto) {
    const {code, name, yearBuilt, address} = createBuildingDto;
    const newBuilding: Building = new Building(code, name, yearBuilt, address);
    
    // On fusionne les données reçues dans notre nouvelle instance
    Object.assign(newBuilding, createBuildingDto);
    
    this.buildings.push(newBuilding);

    return newBuilding;
  }
  
  update(id: string, updateBuildingDto: UpdateBuildingDto): Building {
    const building: Building = this.findOne(id);
    
    Object.assign(building, updateBuildingDto);
    building.updatedAt = new Date();

    return building;
  }

  remove(id: string) {
    const index: number =  this.findBuildingIndex(id);
    this.buildings.splice(index, 1);
  }

  private findBuildingIndex(id: string): number{
    const index: number = this.buildings.findIndex((building: Building) => building.id === id);
    
    if(index === -1){
      throw new NotFoundException(`Le bâtiment avec l'ID "${id}" n'existe pas.`);
    }

    return index;
  }
}
