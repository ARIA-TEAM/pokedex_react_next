import { lazy } from "react";

const PokemonItem = lazy(() => import("../PokemonItem/PokemonItem"));

import Title from "../Title/Title";
import Text from "../Text/Text";
import Button from "../Button/Button";

interface Pokemon {
  name: string;
}

type PokemonListProps = {
  pokemons: Pokemon[];
  toggleFavorite: (pokemon: any) => void;
  isFavorite: (pokemon: any) => boolean;
  handleShowModal: () => void;
  handleModalPokemon: (pokemon: any) => void;
  handlePageChange: (page: any) => void;
};

const PokemonList = ({
  pokemons,
  toggleFavorite,
  isFavorite,
  handleShowModal,
  handleModalPokemon,
  handlePageChange
}: PokemonListProps) => {
  return (
    <>
      {pokemons.length === 0 ? (
        <>
          <Title text="Uh-oh!" />
          <Text text="You look lost on your journey." />
          <Button
            tab="all"
            handlePageChange={() => handlePageChange("all")}
            text="Back to home"
          />
        </>
      ) : (
        <>
          <ul>
            {pokemons.map((pokemon: Pokemon, index) => (
              <PokemonItem
                key={pokemon.name}
                toggleFavorite={() => toggleFavorite(pokemon)}
                isFavorite={isFavorite(pokemon)}
                pokemon={pokemon}
                handleShowModal={handleShowModal}
                handleModalPokemon={() => handleModalPokemon(pokemon)}
              />
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default PokemonList;
