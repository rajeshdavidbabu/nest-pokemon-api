import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonQueryParams } from './pokemon.validator';
import {
  IPokemonResponse,
} from './pokemon.interface';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  getPokemon(@Query() pokemonQueryParams: PokemonQueryParams): Promise<IPokemonResponse> {
    const { limit, offset, type, noOfEvolutions } = pokemonQueryParams;

    console.log('incoming params ', limit, offset, type, noOfEvolutions);

    return this.pokemonService.getPokemon(limit, offset, type, noOfEvolutions);
  }
}
