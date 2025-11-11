import usePokemonContext from "../hooks/usePokemonContext";

const FavoritePokemonCard = ({ pokemon }) => {
  const { toggleFavorite } = usePokemonContext();

  return (
    <article className="bg-slate-100 rounded-2xl p-3 grid gap-2 relative">
      <button
        onClick={() => toggleFavorite(pokemon)}
        className="absolute top-2 right-2 bg-white w-8 h-8 rounded-full text-red-500 hover:bg-red-100"
        title="Eliminar de favoritos"
      >
        <i className="bi bi-trash"></i>
      </button>

      <header>
        <img src={pokemon.image} alt={pokemon.name} className="pixelated mx-auto"/>
      </header>
      <h4 className="capitalize font-semibold text-center">{pokemon.name}</h4>
    </article>
  );
};

export default FavoritePokemonCard;