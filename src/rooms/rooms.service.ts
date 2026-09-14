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

  findOne(id: string): Room {
    const index: number = this.findRoomIndex(id);

    return this.rooms.at(index)!;
  }

  update(id: string, updateRoomDto: UpdateRoomDto) {
    const room: Room = this.findOne(id);

    Object.assign(room, updateRoomDto);
    room.updatedAt = new Date();

    return room;
  }

  remove(id: string): void {
    const index: number = this.findRoomIndex(id);
    this.rooms.splice(index, 1);
  }

  private findRoomIndex(id: string): number {
    const index: number = this.rooms.findIndex((room: Room) => room.id === id);

    if (index === -1) {
      throw new NotFoundException(`Le local avec l'ID "${id}" n'existe pas.`);
    }

    return index;
  }
}
