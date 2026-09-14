import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { RoomType } from "./room-type.enum";


export class CreateRoomDto {
    @ApiProperty({
        description: 'Code unique du local dans son bâtiment',
        example: 'D-112',
    })
    code!: string;

    @ApiProperty({
        description: 'Identifiant UUID du bâtiment',
        format: 'uuid',
    })
    buildingId!: string;

    @ApiProperty({
        description: 'Étage où se trouve le local',
        example: 1,
        minimum: -5,
        maximum: 100,
    })
    floor!: number;

    @ApiPropertyOptional({
        description: 'Type de la salle (exemple : classe, laboratoire, bureau, etc.)',
        enum: RoomType,
        example: RoomType.CLASSROOM,
        required: false,
    })
    type?: string;

    @ApiProperty({
        description: 'Le nombre de places que le local peut supporter',
        example: 20,
        minimum: 4,
        maximum: 100,
        required: false,
    })
    capacity?: number;
}
