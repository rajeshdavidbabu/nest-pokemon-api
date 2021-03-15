export const POKEMON_GENERIC_URL = 'https://test.pokeapi.co/api/v2/pokemon?offset=0&limit=10';
export const POKEMON_DETAILS_URL_ONE = 'https://test.pokeapi.co/api/v2/pokemon/201';
export const POKEMON_DETAILS_URL_TWO = 'https://test.pokeapi.co/api/v2/pokemon/202';
export const POKEMON_SPECIES_URL_ONE = 'https://test.pokeapi.co/api/v2/pokemon-species/201';
export const POKEMON_SPECIES_URL_TWO = 'https://test.pokeapi.co/api/v2/pokemon-species/202';
export const POKEMON_EVOLUTION_CHAIN_URL = 'https://test.pokeapi.co/api/v2/evolution-chain/99';

export const POKEMON_GENERIC_MOCK = {
  next: 'https://test.pokeapi.co/api/v2/pokemon?offset=10&limit=10',
  previous: 'https://test.pokeapi.co/api/v2/pokemon?offset=0&limit=10',
  results: [
    {
      name: 'unown',
      url: 'https://test.pokeapi.co/api/v2/pokemon/201',
    },
    {
      name: 'wobbuffet',
      url: 'https://test.pokeapi.co/api/v2/pokemon/202',
    },
  ],
};
export const POKEMON_DETAILS_MOCK_ONE = {
  id: '201',
  name: 'unown',
  types: [
    {
      slot: 1,
      type: {
        name: 'psychic',
        url: 'https://test.pokeapi.co/api/v2/type/14',
      },
    },
  ],
  sprites: {
    other: {
      'official-artwork': {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/201.png',
      },
    },
  },
};
export const POKEMON_DETAILS_MOCK_TWO = {
  id: '202',
  name: 'wobbuffet',
  types: [
    {
      slot: 1,
      type: {
        name: 'psychic',
        url: 'https://test.pokeapi.co/api/v2/type/14/',
      },
    },
  ],
  sprites: {
    other: {
      'official-artwork': {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/201.png',
      },
    },
  },
};
export const POKEMON_SPECIES_MOCK = {
  evolution_chain: {
    url: 'https://test.pokeapi.co/api/v2/evolution-chain/99',
  },
};
export const POKEMON_EVOLUTION_CHAIN_MOCK = {
  baby_trigger_item: null,
  chain: {
    evolution_details: [],
    evolves_to: [
      {
        evolution_details: [],
        evolves_to: [],
        is_baby: false,
        species: {
          name: 'wobbuffet',
          url: 'https://pokeapi.co/api/v2/pokemon-species/202',
        },
      },
    ],
    is_baby: false,
    species: {
      name: 'unown',
      url: 'https://pokeapi.co/api/v2/pokemon-species/201',
    },
  },
  id: 99,
};
export const POKEMON_RESPONSE = {
  next: 'https://test.pokeapi.co/api/v2/pokemon?offset=10&limit=10',
  previous: 'https://test.pokeapi.co/api/v2/pokemon?offset=0&limit=10',
  detailedResults: [
    {
      name: 'unown',
      id: '201',
      types: ['psychic'],
      imageUrl:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/201.png',
      evolutionSequence: ['unown', 'wobbuffet'],
      numberOfEvolutions: 1,
    },
  ],
};

export function mockDataBasedOnInputUrl(inputUrl) {
  if (inputUrl === POKEMON_GENERIC_URL) {
    return Promise.resolve(POKEMON_GENERIC_MOCK);
  } else if (inputUrl === POKEMON_DETAILS_URL_ONE) {
    return Promise.resolve(POKEMON_DETAILS_MOCK_ONE);
  } else if (inputUrl === POKEMON_DETAILS_URL_TWO) {
    return Promise.resolve(POKEMON_DETAILS_MOCK_TWO);
  } else if ([POKEMON_SPECIES_URL_ONE, POKEMON_SPECIES_URL_TWO].includes(inputUrl)) {
    return Promise.resolve(POKEMON_SPECIES_MOCK);
  } else if (POKEMON_EVOLUTION_CHAIN_URL) {
    return Promise.resolve(POKEMON_EVOLUTION_CHAIN_MOCK);
  }
}
