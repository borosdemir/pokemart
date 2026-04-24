import { useState, useEffect } from 'react';
import { Product } from '../context/CartContext';
import { fetchPokemonList, fetchLegendaries } from '../services/pokeApi';

export const usePokemonList = (limit: number = 151) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPokemonList(limit);
        setProducts(data);
      } catch (err) {
        setError('Error sincronizando con la PokeDex satelital.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [limit]);

  return { products, loading, error };
};

export const useLegendaries = (ids: number[]) => {
  const [legendaries, setLegendaries] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLegendaries = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchLegendaries(ids);
        setLegendaries(data);
      } catch (err) {
        setError('Error localizando a los Pokémon Legendarios.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadLegendaries();
  }, [ids.join('-')]); // Dependemos de los IDs para refetch si cambian

  return { legendaries, loading, error };
};
