import { useState, useEffect } from "react";
import Button from "../Button/Button";
import styles from "./PokemonItem.module.scss";

type PokemonItemProps = {
  isFavorite?: boolean;
  onClick?: () => void;
  toggleFavorite: (pokemon: any) => void;
  pokemon: any;
  handleShowModal: () => void;
  handleModalPokemon: (pokemon: any) => void;
};

const PokemonItem = ({
  toggleFavorite,
  pokemon,
  isFavorite,
  handleShowModal,
  handleModalPokemon
}: PokemonItemProps) => {
  const [isFav, setIsFav] = useState(isFavorite);

  useEffect(() => {
    setIsFav(isFavorite);
  }, [isFavorite]);

  const setFavorite = (pokemon: any) => {
    toggleFavorite(pokemon);
    setIsFav(!isFav);
  };

  const handleClick = () => {
    handleShowModal();
    handleModalPokemon(pokemon);
  };

  return (
    <li className={styles.pokemonItem}>
      <div onClick={handleClick}>{pokemon.name}</div>
      <Button
        icon={isFav ? "/star_selected.svg" : "/star.svg"}
        onClick={() => setFavorite(pokemon)}
        pokemon={pokemon}
        // type="button"
        toggleFavorite={() => setFavorite(pokemon)}
      />
    </li>
  );
};

export default PokemonItem;
