import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from '../../../src/pokemon/pokemon.controller';
import { PokemonService } from '../../../src/pokemon/pokemon.service';
import * as PokemonUtils from '../../../src/pokemon/pokemon.utils';
import { PokemonQueryParams } from '../../../src/pokemon/pokemon.validator';
import { mockDataBasedOnInputUrl, POKEMON_RESPONSE } from '../../factory/pokemon.factory';
import { HttpException } from '@nestjs/common';

describe('PokemonController', () => {
  let pokemonController: PokemonController;
  const OLD_ENV = process.env;

  beforeAll(() => {
    jest.resetModules();
    process.env.POKEMON_BASE_URL = 'https://test.pokeapi.co/api/v2';
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [PokemonService],
    }).compile();

    pokemonController = module.get<PokemonController>(PokemonController);
  });

  describe('getPokemon', () => {
    const pokemonQueryParams: PokemonQueryParams = {
      limit: 10,
      offset: 0,
      type: 'psychic',
      noOfEvolutions: 1,
    };

    it('should return expected pokemon response', () => {
      // Mocking the method that calls the LEAN server
      jest.spyOn(PokemonUtils, 'fetchData').mockImplementation(mockDataBasedOnInputUrl);

      expect(pokemonController.getPokemon(pokemonQueryParams)).resolves.toEqual(POKEMON_RESPONSE);
    });

    it('failure case for fetchGraphQL', () => {
      jest.spyOn(PokemonUtils, 'fetchData').mockImplementation(() => Promise.reject({ error: {} }));

      expect(pokemonController.getPokemon(pokemonQueryParams)).rejects.toThrow(HttpException);
    });
  });
});
