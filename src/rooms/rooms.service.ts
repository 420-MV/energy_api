import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './schemas/room.schema';
import { RoomsRepository } from './rooms.repository';

@Injectable()
export class RoomsService {

  constructor(private readonly roomsRepository: RoomsRepository) { }

  findAll(): Promise<Room[]> {
    return this.roomsRepository.findAll();
  }

  async findById(id: string): Promise<Room> {
    const room = await this.roomsRepository.findById(id);
    if (!room) {
      throw new NotFoundException(`Le local avec l'ID "${id}" n'existe pas.`);
    }
    return room;
  }

  create(data: CreateRoomDto): Promise<Room> {
    return this.roomsRepository.create(data);
  }

  async update(id: string, data: UpdateRoomDto): Promise<Room> {
    const updatedRoom = await this.roomsRepository.update(id, data);
    if (!updatedRoom) {
      throw new NotFoundException(`Le local avec l'ID "${id}" n'existe pas.`);
    }
    return updatedRoom;
  }

  async remove(id: string): Promise<void> {
    const deletedRoom = await this.roomsRepository.remove(id);
    if (!deletedRoom) {
      throw new NotFoundException(`Le local avec l'ID "${id}" n'existe pas.`);
    }
  }
}