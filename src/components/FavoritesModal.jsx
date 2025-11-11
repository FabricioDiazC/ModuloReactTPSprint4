import usePokemonContext from "../hooks/usePokemonContext";
import FavoritePokemonCard from "./FavoritePokemonCard";

const FavoritesModal = ({ show, onClose }) => {
  const { favorites, clearFavorites } = usePokemonContext();

  return (
    <section
      className={`fixed inset-0 bg-black/50 transition-all duration-300 ${
        show ? "visible opacity-100" : "invisible opacity-0"
      } z-50`}
    >
      <div
        className={`bg-white w-[90%] max-w-2xl absolute top-1/2 left-1/2 -translate-x-1/2 rounded-2xl p-6 transition-transform duration-300 ${
          show ? "translate-y-[-50%] scale-100" : "translate-y-[-150%] scale-75"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl hover:text-red-500"
        >
          <i className="bi bi-x"></i>
        </button>

        <h2 className="text-2xl font-bold mb-4">Mis Favoritos</h2>

        {favorites.length > 0 && (
          <div className="flex justify-end mb-4">
            <button
              onClick={clearFavorites}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Borrar todos los favoritos
            </button>
          </div>
        )}

        <div className="grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-4 max-h-[70vh] overflow-y-auto pr-2">
          {favorites.map((pokemon) => (
            <FavoritePokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>

        {favorites.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            Aún no tienes Pokemon favoritos.
          </p>
        )}
      </div>
    </section>
  );
};

export default FavoritesModal;