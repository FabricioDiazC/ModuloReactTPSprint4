import { createContext, useEffect, useState } from "react";
import {
  formatAbilities,
  formatStats,
  formatTypes,
  getEvolutions,
  getImageByPokemon,
  getPokemonDescription,
} from "../helpers/pokemon";
import axios from "axios";

const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [showDetailPokemon, setShowDetailPokemon] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) ?? []
  );

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (pokemon) => {
    const isAlreadyFavorite = favorites.some((fav) => fav.id === pokemon.id);
    if (isAlreadyFavorite) {
      const newFavorites = favorites.filter((fav) => fav.id !== pokemon.id);
      setFavorites(newFavorites);
    } else {
        // Para guardar el objeto completo en favoritos, creamos una versión simplificada
        const simplifiedPokemon = {
          id: pokemon.id,
          name: pokemon.name,
          // La imagen para el favorito la tomamos del mismo lugar que para el detalle
          image: getImageByPokemon(pokemon.sprites),
          // Guardamos el objeto completo por si necesitamos mostrar su detalle desde favoritos en un futuro
          pokemonInfo: pokemon,
        }
      setFavorites([...favorites, simplifiedPokemon]);
    }
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const openFavoritesModal = () => setShowFavoritesModal(true);
  const closeFavoritesModal = () => setShowFavoritesModal(false);

  const showPokemon = async (pokemonInfo) => {
    setIsLoading(true);
    const { data: dataSpecies } = await axios.get(pokemonInfo.species.url);
    const { data: dataEvolution } = await axios.get(
      dataSpecies.evolution_chain.url
    );

    const { id, name, height, weight, stats, types, abilities } = pokemonInfo;
    const evolutions = await getEvolutions(dataEvolution);

    setPokemonDetail({
      id,
      name,
      height,
      weight,
      stats: formatStats(stats),
      types: formatTypes(types),
      abilities: formatAbilities(abilities),
      description: getPokemonDescription(dataSpecies),
      evolutions,
      image: getImageByPokemon(pokemonInfo.sprites),
    });
    setShowDetailPokemon(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const closePokemonDetail = () => {
    setShowDetailPokemon(false);
  };

  return (
    <PokemonContext.Provider
      value={{
        showDetailPokemon,
        showPokemon,
        closePokemonDetail,
        pokemonDetail,
        isLoading,
        favorites,
        toggleFavorite,
        clearFavorites,
        showFavoritesModal,
        openFavoritesModal,
        closeFavoritesModal,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export { PokemonContext, PokemonProvider };