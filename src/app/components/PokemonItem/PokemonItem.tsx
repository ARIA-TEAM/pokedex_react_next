import { useState, useRef, useEffect, RefObject } from "react";
import Button from "../Button/Button";
import styles from "./PokemonItem.module.scss";

type PokemonItemProps = {
  isFavorite?: boolean;
  onClick?: () => void;
  toggleFavorite: (pokemon: any) => void;
  pokemon: any;
};

const PokemonItem = ({ toggleFavorite, pokemon, isFavorite }: PokemonItemProps) => {
  const [isFav, setIsFav] = useState(isFavorite);

  const setFavorite = (pokemon: any) => {
    toggleFavorite(pokemon);
    setIsFav(!isFav);
  };

  return (
    <li className={styles.pokemonItem}>
      <a href={""}>{pokemon.name}</a>
      <Button
        icon={isFav ? "/star_selected.svg" : "/star.svg"}
        onClick={() => setFavorite(pokemon)}
        pokemon={pokemon}
        toggleFavorite={() => setFavorite(pokemon)}
      />
    </li>
  );
};

export default PokemonItem;
