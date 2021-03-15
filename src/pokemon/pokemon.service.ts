import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { fetchData, isArrayWithNonZeroLength } from './pokemon.utils';
import {
  IPokemonResponse,
  IDetailedResult,
  IPokemonRawResponse,
  IPokemonSpeciesRawResponse,
} from './pokemon.interface';

@Injectable()
export class PokemonService {
  private extractSpeciesName(evolutionChain, collector): void {
    const {
      species: { name },
      evolves_to: evolvesTo,
    } = evolutionChain;

    collector.push(name);

    if (isArrayWithNonZeroLength(evolvesTo)) {
      this.extractSpeciesName(evolvesTo[0], collector);
    }
  }

  private getEvolutionSequence(evolutionChain): Array<string> {
    const evolutionSequence = [];

    // Mutate the array to populate the data.
    this.extractSpeciesName(evolutionChain, evolutionSequence);

    return evolutionSequence;
  }

  private getNumberOfEvolutions(evolutionSequence, name): number {
    if (!isArrayWithNonZeroLength(evolutionSequence)) {
      return 0;
    }

    const indexOfName = evolutionSequence.indexOf(name);

    return evolutionSequence.length - 1 - indexOfName;
  }

  private getPokemonGeneric(limit, offset): Promise<IPokemonRawResponse> {
    const pokemonUrl = `${process.env.POKEMON_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`;

    return fetchData(pokemonUrl);
  }

  private getPokemonSpecies(id): Promise<IPokemonSpeciesRawResponse> {
    const pokemonSpeciesUrl = `${process.env.POKEMON_BASE_URL}/pokemon-species/${id}`;

    return fetchData(pokemonSpeciesUrl);
  }

  async getPokemon(limit, offset, type, noOfEvolutions): Promise<IPokemonResponse> {
    try {
      const { next, previous, results } = await this.getPokemonGeneric(limit, offset);
      const evolutionData = {};
      let detailedResults: Array<IDetailedResult> = await Promise.all(
        results.map(
          async ({ url: pokemonDetailUrl }): Promise<IDetailedResult> => {
            const {
              name,
              id,
              types: typesRaw,
              sprites: {
                other: {
                  'official-artwork': { front_default: imageUrl },
                },
              },
            } = await fetchData(pokemonDetailUrl);
            const types = typesRaw.map(({ type: { name } }) => name);

            // Filter based on given types.
            if (type && !types.includes(type)) {
              return null;
            }

            const {
              evolution_chain: { url: evolutionChainUrl },
            } = await this.getPokemonSpecies(id);

            if (!evolutionData[evolutionChainUrl]) {
              const { chain } = await fetchData(evolutionChainUrl);
              // Save result in memory to avoid re-fetching.
              evolutionData[evolutionChainUrl] = this.getEvolutionSequence(chain);
            }

            // Extract from memory if evolution-chain request is already made once.
            const evolutionSequence = evolutionData[evolutionChainUrl];
            const numberOfEvolutions = this.getNumberOfEvolutions(evolutionSequence, name);

            // Filter based on number of evolutions.
            if (noOfEvolutions != undefined && noOfEvolutions !== numberOfEvolutions) {
              return null;
            }

            return {
              name,
              id,
              types,
              imageUrl,
              evolutionSequence,
              numberOfEvolutions,
            };
          },
        ),
      );

      // Filter results for null values.
      detailedResults = detailedResults.filter(Boolean);

      return { next, previous, detailedResults };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error?.message || 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
