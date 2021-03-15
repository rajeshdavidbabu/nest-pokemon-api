import { Injectable } from '@nestjs/common';
import { fetchData, isArrayWithNonZeroLength } from './pokemon.utils';

@Injectable()
export class PokemonService {
  private extractSpeciesName(evolutionChain, collector): void { 
    const {
      species: { name },
      'evolves_to': evolvesTo
    } = evolutionChain;

    collector.push(name);

    if (isArrayWithNonZeroLength(evolvesTo)) { 
      this.extractSpeciesName(evolvesTo[0], collector);
    }
  }

  private getEvolutionSequence(evolutionChain) { 
    const evolutionSequenceArray = [];

    // Mutate the array to populate the data.
    this.extractSpeciesName(evolutionChain, evolutionSequenceArray);

    return evolutionSequenceArray;
  }

  private getNumberOfEvolutions(evolutionSequence, name): number {
    if (!isArrayWithNonZeroLength(evolutionSequence)) { 
      return 0;
    }
    
    const indexOfName = evolutionSequence.indexOf(name); 

    return --evolutionSequence.length - indexOfName;
  }
 
  async getAllPokemon(): Promise<any> {
    const { next, previous, results } = await fetchData(
      'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20',
    );
    const evolutionData = {};
    const detailedResults = await Promise.all(
      results.map(
        async ({ url }): Promise<any> => {
          const {
            name,
            id,
            types: typesRaw,
            sprites: {
              other: {
                'official-artwork': { front_default: imageUrl },
              },
            },
          } = await fetchData(url);
          const types = typesRaw.map(({ type: { name }}) => name);
          const { evolution_chain: { url: evolutionChainUrl } } = await fetchData(
            `https://pokeapi.co/api/v2/pokemon-species/${id}`,
          );

          if (!evolutionData[evolutionChainUrl]) {
            const { chain } = await fetchData(evolutionChainUrl);
            // Save result in memory to avoid re-fetching.
            evolutionData[evolutionChainUrl] = this.getEvolutionSequence(chain);
          }

          // Extract from memory if evolution-chain request is already made once.
          const evolutionSequence = evolutionData[evolutionChainUrl];
          const numberOfEvolutions = this.getNumberOfEvolutions(evolutionSequence, name);

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

    return { next, previous, detailedResults };
  }
}
