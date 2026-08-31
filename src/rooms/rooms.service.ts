import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsService {
  private readonly rooms: Room[] = [];

  create(createRoomDto: CreateRoomDto) {
    const newRoom: Room = new Room(createRoomDto);
    
    this.rooms.push(newRoom);

    return newRoom;
  }

  findAll() {
    return this.rooms;
  }

  findOne(id: string) {
    const room: Room | undefined = this.rooms.find((room: Room) => room.id === id);
    
    if(!room){
      throw new NotFoundException(`Le local avec l'ID "${id}" n'existe pas.`);
    }

    return room;
  }

  update(id: string, updateRoomDto: UpdateRoomDto) {
    const room: Room = this.findOne(id);
        
    Object.assign(room, updateRoomDto);
    room.updatedAt = new Date();

    return room;
  }

  remove(id: string): void {
    const index: number =  this.rooms.findIndex((room: Room) => room.id === id);
    if(index === -1){
      throw new NotFoundException(`Le local avec l'ID "${id}" n'existe pas.`);
    }

    this.rooms.splice(index, 1);
  }
}
