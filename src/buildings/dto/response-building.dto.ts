import { ApiProperty } from "@nestjs/swagger";


export class BuildingResponseDto {
    @ApiProperty({
        description: 'Identifiant UUID du bâtiment',
        format: 'uuid',
        required: true,
    })
    id?: string;

    @ApiProperty({
        description: 'Les code du bâtiment',
        example: 'bld-001',
        minLength: 7,
        maxLength: 7,
    })
    code!: string;

    @ApiProperty({
        description: 'Nom public et unique du bâtiment',
        example: 'Pavillon principal',
        maxLength: 100,
    })
    name!: string;

    @ApiProperty({
        description: 'Année de construction',
        example: 1965,
        minimum: 1800,
        maximum: 2026,
    })
    yearBuilt!: number;

    @ApiProperty({
        description: "L'adresse du bâtiment",
        example: "7000 rue Marie-victorin, Montréal",
        minLength: 5,
        maxLength: 200,
    })
    address!: string;

    @ApiProperty({
        description: "La date de création du bâtiment",
        example: new Date().toISOString()
    })
    createdAt!: Date;

    @ApiProperty({
        description: "La date de modification du bâtiment",
        example: new Date().toISOString()
    })
    updatedAt!: Date;
}
