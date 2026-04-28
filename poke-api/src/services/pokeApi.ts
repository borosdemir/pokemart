import { Product } from '../context/CartContext';

const typeTranslations: { [key: string]: string } = {
  normal: 'Normal',
  fire: 'Fuego',
  water: 'Agua',
  electric: 'Eléctrico',
  grass: 'Planta',
  ice: 'Hielo',
  fighting: 'Lucha',
  poison: 'Veneno',
  ground: 'Tierra',
  flying: 'Volador',
  psychic: 'Psíquico',
  bug: 'Bicho',
  rock: 'Roca',
  ghost: 'Fantasma',
  dragon: 'Dragón',
  dark: 'Siniestro',
  steel: 'Acero',
  fairy: 'Hada',
};

const CACHE_KEY_LIST = 'pokemart_pokemon_list_v1';
const CACHE_KEY_LEGENDARIES = 'pokemart_legendaries_v1';

/**
 * Obtiene la lista principal de Pokémon (Gen 1)
 */
export const fetchPokemonList = async (limit: number = 151): Promise<Product[]> => {
  // 1. Intentar obtener del caché
  const cachedData = localStorage.getItem(`${CACHE_KEY_LIST}_${limit}`);
  if (cachedData) {
    console.log('Cargando Pokémon desde caché 📦');
    return JSON.parse(cachedData);
  }

  // 2. Si no hay caché, consultar a la API
  console.log('Consultando PokeAPI 🌐');
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  const data = await response.json();

  const detailedPromises = data.results.map((pokemon: any) =>
    fetch(pokemon.url).then((res) => res.json())
  );

  const detailedResults = await Promise.all(detailedPromises);

  // 3. Mapear al modelo Product
  const mappedProducts: Product[] = detailedResults.map((pokemon: any) => {
    const typeEn = pokemon.types[0].type.name;
    const typeEs = typeTranslations[typeEn] || typeEn;

    return {
      id: pokemon.id,
      title: pokemon.name,
      price: pokemon.id * 10,
      description: `Un asombroso Pokémon de tipo ${typeEs}.`,
      category: typeEs,
      image: pokemon.sprites.other['official-artwork'].front_default,
    };
  });

  // 4. Guardar en caché para el futuro
  localStorage.setItem(`${CACHE_KEY_LIST}_${limit}`, JSON.stringify(mappedProducts));
  return mappedProducts;
};

/**
 * Obtiene la lista de Pokémon Legendarios Específicos
 */
export const fetchLegendaries = async (ids: number[]): Promise<Product[]> => {
  const cacheKey = `${CACHE_KEY_LEGENDARIES}_${ids.join('-')}`;
  
  // 1. Intentar obtener del caché
  const cachedData = localStorage.getItem(cacheKey);
  if (cachedData) {
    console.log('Cargando Legendarios desde caché 📦');
    return JSON.parse(cachedData);
  }

  // 2. Consultar API
  console.log('Consultando PokeAPI (Legendarios) 🌐');
  const promises = ids.map(id => 
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())
  );
  
  const detailedResults = await Promise.all(promises);

  // 3. Mapear
  const mappedLegendaries: Product[] = detailedResults.map((pokemon: any) => {
    const typeEn = pokemon.types[0].type.name;
    const typeEs = typeTranslations[typeEn] || typeEn;
    
    return {
      id: pokemon.id,
      title: pokemon.name,
      price: pokemon.id * 10000,
      description: `Un Pokémon legendario de poder inmenso.`,
      category: typeEs,
      image: pokemon.sprites.other['official-artwork'].front_default,
    };
  });

  // 4. Guardar en caché
  localStorage.setItem(cacheKey, JSON.stringify(mappedLegendaries));
  return mappedLegendaries;
};
