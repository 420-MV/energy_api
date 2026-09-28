import { PartialType } from '@nestjs/mapped-types';
import { CreateBuildingDto } from './create-building.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Matches } from '@nestjs/class-validator';
import { IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

export class UpdateBuildingDto extends PartialType(CreateBuildingDto) {
    @ApiProperty({
        description: 'Code unique du bâtiment',
        example: 'bld-001',
    })
    @Matches(/^(?:bld|BLD)-\d{3}$/, {
        message: "Les code du bâtiment devrait suivre le format suivant : bld-xxx ou BLD-xxx ou x est un chiffre."
    })
    code!: string;

    @ApiProperty({
        description: 'Nom du bâtiment',
        example: 'Tour Eiffel',
    })
    @IsString()
    @MaxLength(100)
    name!: string;

    @ApiProperty({
        description: 'Année de construction du bâtiment',
        example: 1889,
    })
    @IsOptional()
    @IsInt()
    @Min(1500)
    @Max(new Date().getFullYear())
    yearBuilt!: number;

    @ApiProperty({
        description: 'Adresse complète du bâtiment',
        example: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
    })
    @IsOptional()
    @IsString()
    address!: string;
}
