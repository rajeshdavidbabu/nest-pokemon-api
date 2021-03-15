export interface IPokemonResponse {
  next: string | null;
  previous: string | null;
  detailedResults: Array<IDetailedResult>;
}

export interface IDetailedResult {
  name: string;
  id: number;
  types: Array<string>;
  imageUrl: string;
  evolutionSequence: Array<string>;
  numberOfEvolutions: number;
}

export interface IPokemonRawResponse {
  next: string | null;
  previous: string | null;
  results: Array<any>;
}

interface IEvolutionChain {
  url: string;
}

export interface IPokemonSpeciesRawResponse {
  evolution_chain: IEvolutionChain;
}
