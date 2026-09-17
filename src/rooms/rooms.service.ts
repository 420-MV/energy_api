import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from './schemas/room.schema';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room.name) private readonly roomModel: Model<Room>) {}

  create(dto: CreateRoomDto) {
    return this.roomModel.create(dto);
  }

  findAll() : Promise<Room[]>{
    return this.roomModel.find().lean();
  }

  async findById(id: string) : Promise<Room>{
    const room = await this.roomModel.findById(id).lean();
    if (!room) {
       throw new NotFoundException('Room not found');
    }
    return room;
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) : Promise<Room | null> {
    const updated : Room | null = await this.roomModel.findByIdAndUpdate(id, updateRoomDto, { new: true }).exec();

    if (!updated) {
        throw new NotFoundException(`Le local avec l'id ${id} n'existe pas.`);
    }

    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.roomModel.findByIdAndDelete({ _id: id }).lean().exec();

    if (!deleted) {
        throw new NotFoundException(`Le local avec l'id ${id} n'existe pas.`);
    }
  }
}
