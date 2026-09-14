import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from './create-room.dto';
import { ApiProperty } from '@nestjs/swagger';
import { RoomType } from './room-type.enum';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
    @ApiProperty({
        description: 'Code unique du local dans son bâtiment (optionnel pour la mise à jour)',
        example: 'D-112',
        required: false,
    })
    code?: string;

    @ApiProperty({
        description: 'Identifiant UUID du bâtiment (optionnel pour la mise à jour)',
        format: 'uuid',
        required: false,
    })
    buildingId?: string;

    @ApiProperty({
        description: 'Étage où se trouve le local (optionnel pour la mise à jour)',
        example: 1,
        minimum: -5,
        maximum: 100,
        required: false,
    })
    floor?: number;

    @ApiProperty({
        description: 'Type de la salle (optionnel pour la mise à jour)',
        enum: RoomType,
        example: 'classroom',
        required: false,
    })
    type?: string;

    @ApiProperty({
        description: 'Le nombre de places que le local peut supporter (optionnel pour la mise à jour)',
        example: 20,
        required: false,
    })
    capacity?: number;
}
