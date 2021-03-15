import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PokemonQueryParams {
  @ApiProperty({
    description: 'The maximum number of pokemons that can be fetched on single request.',
  })
  @IsNotEmpty()
  @IsNumber()
  limit: number;

  @ApiProperty({
    description: 'The beginning index of the pokemons to be fetched.',
  })
  @IsNotEmpty()
  @IsNumber()
  offset: number;

  @ApiProperty({
    description: 'The type of pokemon.',
    required: false,
  })
  @IsOptional()
  type: string;

  @ApiProperty({
    description: 'The number of evolutions of pokemon.',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  noOfEvolutions: number;
}
