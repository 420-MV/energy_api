import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ValidationIssueDto {
  @ApiProperty({
    example: 'capacity',
  })
  field!: string;

  @ApiProperty({
    type: [String],
    example: [
      'La capacité doit être supérieure ou égale à 1.',
    ],
  })
  messages!: string[];
}

export class ProblemDetailsDto {
    @ApiProperty({ example: 'about:blank' })
    type!: string;

    @ApiProperty({ example: 'Bad Request' })
    title!: string;

    @ApiProperty({ example: 400 })
    status!: number;

    @ApiProperty({
      example: 'La requête contient des données invalides.',
    })
    detail!: string;

    @ApiProperty({ example: '/api/v1/buildings' })
    instance!: string;

    @ApiPropertyOptional({
      type: [ValidationIssueDto],
      example: ['Le nom est obligatoire.'],
    })
    errors?: ValidationIssueDto[];

    @ApiProperty({ 
      format: 'date-time',
      example: new Date().toISOString() 
    })
    timestamp: string;
  }