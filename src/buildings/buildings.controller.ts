import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpCode, HttpStatus } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { BuildingResponseDto } from './dto/response-building.dto';
import { ProblemDetailsDto } from 'src/commun/dto/problem-details.dto';

@Controller('buildings')
export class BuildingsController {
  constructor(private readonly buildingsService: BuildingsService) {}

  @Post()
  @ApiOperation({
    summary: 'Créer un bâtiment',
    description: 'Ajoute un bâtiment à la collection courante.',
  })
  @ApiCreatedResponse({
    description: 'Bâtiment créé.',
    type: BuildingResponseDto,
    headers: {
      Location: {
        description: 'URI de la nouvelle ressource',
        schema: { type: 'string' },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Données invalides.',
    type: ProblemDetailsDto,
  })
  create(@Body() createBuildingDto: CreateBuildingDto) {
    return this.buildingsService.create(createBuildingDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Lister tous les bâtiments',
    description: 'Lister tous les bâtiments de la collection courante.',
  })
  findAll() {
    return this.buildingsService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Identifiant UUID du bâtiment',
    format: 'uuid',
  })
  findOne(@Param('id') id: string) {
    return this.buildingsService.findOne(id);
  }

  @Patch(':id')
    @ApiOkResponse({
    description: 'Bâtiment modifié.',
    type: BuildingResponseDto,
  })
  @ApiOperation({
    summary: 'Modifier un bâtiment',
    description: "Modifier un ou plusieurs attributs d'un bâtiment à la collection courante.",
  })
  update(@Param('id') id: string, @Body() updateBuildingDto: UpdateBuildingDto) {
    return this.buildingsService.update(id, updateBuildingDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Supprimer un bâtiment',
    description: 'Retirer un bâtiment à la collection courante.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.buildingsService.remove(id);
  }
}
