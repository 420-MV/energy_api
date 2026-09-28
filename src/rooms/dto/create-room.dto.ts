import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { RoomType } from "./room-type.enum";
import { IsEnum, IsInt, IsMongoId, Matches, Max, Min } from "class-validator";


export class CreateRoomDto {
    @ApiProperty({
        description: 'Code unique du local dans son bâtiment',
        example: 'D-112',
    })
    @Matches(/^[A-Z]-\d{3}$/, {
        message: 'Le code doit respecter le format A-000.',
    })
    code!: string;

    @ApiProperty({
        description: 'Identifiant UUID du bâtiment',
        format: 'uuid',
    })
    @IsMongoId({
        message: 'buildingId doit être un identifiant MongoDB valide.',
    })
    buildingId!: string;

    @ApiProperty({
        description: 'Étage où se trouve le local',
        example: 1,
        minimum: -5,
        maximum: 100,
    })
    @IsInt()
    @Min(-5)
    @Max(100)
    floor!: number;

    @ApiPropertyOptional({
        description: 'Type de la salle (exemple : classe, laboratoire, bureau, etc.)',
        enum: RoomType,
        example: RoomType.CLASSROOM,
        required: false,
    })
    @IsEnum(RoomType, {
        message:
        'Le type doit être classroom, laboratory, office ou common-area.',
    })
    type?: string;

    @ApiProperty({
        description: 'Le nombre de places que le local peut supporter',
        example: 20,
        minimum: 4,
        maximum: 100,
        required: false,
    })
    @IsInt()
    @Min(1)
    @Max(1000)
    capacity?: number;
}
