import { Matches } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, Max, MaxLength, Min } from "class-validator";


export class CreateBuildingDto {
  @ApiProperty({
    description: 'Les code du bâtiment',
    example: 'bld-001',
    minLength: 7,
    maxLength: 7,
  })
  @Matches(/^(?:bld|BLD)-\d{3}$/, {
    message: "Les code du bâtiment devrait suivre le format suivant : bld-xxx ou BLD-xxx ou x est un chiffre."
  })
  code!: string; 

  @ApiProperty({
    description: 'Nom public et unique du bâtiment',
    example: 'Pavillon principal',
    maxLength: 100,
  })
  @IsString()
  @MaxLength(100)
  name!: string;

  @ApiProperty({
    description: 'Année de construction',
    example: 1965,
    minimum: 1800,
    maximum: 2026,
  })
  @IsOptional()
  @IsInt()
  @Min(1500)
  @Max(new Date().getFullYear())
  yearBuilt!: number;

  @ApiProperty({
    description: "L'adresse du bâtiment",
    example: "7000 rue Marie-victorin, Montréal",
    minLength: 5,
    maxLength: 200,
  })
  @IsOptional()
  @IsString()
  address!: string;
}
