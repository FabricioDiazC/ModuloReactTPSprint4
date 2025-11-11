import Aside from "./components/Aside";
import ModalPokemon from "./components/ModalPokemon";
import Pokemons from "./components/Pokemons";
import usePokemonContext from "./hooks/usePokemonContext";
import FavoritesModal from "./components/FavoritesModal";

function App() {
  const { 
    showDetailPokemon,
    closePokemonDetail, 
    pokemonDetail, 
    isLoading,
    showFavoritesModal,
    closeFavoritesModal, 
  } = usePokemonContext();

  return (
    <section className="bg-[#F6F8FC] h-screen font-outfit overflow-y-auto bg-[url(/pokeball-icon.png)] bg-no-repeat bg-[-10%_-20%] overflow-x-hidden">
      <main className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_350px]">
        <Pokemons />
        <Aside pokemon={pokemonDetail} isLoading={isLoading} />
        <ModalPokemon
          showModal={showDetailPokemon}
          onCloseModal={closePokemonDetail}
          pokemon={pokemonDetail}
        />
        <FavoritesModal show={showFavoritesModal} onClose={closeFavoritesModal} />
      </main>
    </section>
  );
}

export default App;