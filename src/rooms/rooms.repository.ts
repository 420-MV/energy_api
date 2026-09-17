import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from './schemas/room.schema';
import { UpdateRoomDto } from './dto/update-room.dto';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomsRepository {
    constructor(
        @InjectModel(Room.name) private readonly roomModel: Model<Room>
    ) { }

    async findAll(): Promise<Room[]> {
        return this.roomModel.find().exec();
    }

    async findById(id: string): Promise<Room | null> {
        return this.roomModel.findById(id).exec();
    }

    async create(data: CreateRoomDto): Promise<Room> {
        return this.roomModel.create(data);
    }

    async update(id: string, data: UpdateRoomDto): Promise<Room | null> {
        return this.roomModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async remove(id: string): Promise<Room | null> {
        return this.roomModel.findByIdAndDelete(id).lean().exec();
    }
}