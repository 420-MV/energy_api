export class CreateRoomDto {
    code!: string;
    buildingId!: string;
    floor!: number;
    type?: string;
    capacity?: number;
}
