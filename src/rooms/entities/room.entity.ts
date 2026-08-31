import { randomUUID } from "crypto";
import { CreateRoomDto } from "../dto/create-room.dto";

export class Room {
    id: string;
    code: string;
    buildingId: string;
    floor: number;
    type?: string;
    capacity?: number;
    createdAt: Date;
    updatedAt: Date;

    constructor({code, buildingId, floor, type, capacity} : CreateRoomDto){
        // Génère automatiquement un identifiant unique (UUID v4) lors du 'new Building()'
        this.id = randomUUID();
        this.code = code;
        this.buildingId = buildingId;
        this.floor = floor;
        type ?? this.type;
        capacity ?? this.capacity;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
