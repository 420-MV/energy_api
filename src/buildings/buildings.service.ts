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
    const building: Building | undefined = this.buildings.find((building: Building) => building.id === id);

    if(!building){
      throw new NotFoundException(`Le bâtiment avec l'ID "${id}" n'existe pas.`);
    }

    return building;
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
    
    console.log(id, updateBuildingDto)
    Object.assign(building, updateBuildingDto);
    building.updatedAt = new Date().toISOString();

    return building;
  }

  remove(id: string) {
    const index: number =  this.buildings.findIndex((building: Building) => building.id === id);
    if(index === -1){
      throw new NotFoundException(`Le bâtiment avec l'ID "${id}" n'existe pas.`);
    }

    this.buildings.splice(index, 1);
  }
}
