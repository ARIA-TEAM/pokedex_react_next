import PokemonItem from "../PokemonItem/PokemonItem";
import Title from "../Title/Title";
import Text from "../Text/Text";

interface Pokemon {
  name: string;
}

type PokemonListProps = {
  pokemons: Pokemon[];
  toggleFavorite: (pokemon: any) => void;
  isFavorite: (pokemon: any) => boolean;
};

const PokemonList = ({
  pokemons,
  toggleFavorite,
  isFavorite,
}: PokemonListProps) => {
  return (
    <>
      {pokemons.length === 0 ? (
        <>
          <Title text="No pokemons" />
          <Text text="The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world." />
        </>
      ) : (
        <ul>
          {pokemons.map((pokemon: Pokemon) => (
            <PokemonItem
              key={pokemon.name}
              toggleFavorite={() => toggleFavorite(pokemon)}
              isFavorite={isFavorite(pokemon)}
              pokemon={pokemon}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default PokemonList;