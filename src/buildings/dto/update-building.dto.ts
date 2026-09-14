import { PartialType } from '@nestjs/mapped-types';
import { CreateBuildingDto } from './create-building.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBuildingDto extends PartialType(CreateBuildingDto) {
    @ApiProperty({
        description: 'Code unique du bâtiment',
        example: 'BLD-001',
    })
    code!: string;

    @ApiProperty({
        description: 'Nom du bâtiment',
        example: 'Tour Eiffel',
    })
    name!: string;

    @ApiProperty({
        description: 'Année de construction du bâtiment',
        example: 1889,
    })
    yearBuilt!: number;

    @ApiProperty({
        description: 'Adresse complète du bâtiment',
        example: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
    })
    address!: string;
}
