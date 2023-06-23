import { useState } from "react";
import Button from "../Button/Button";
import styles from "./PokemonItem.module.scss";

type PokemonItemProps = {
  name: string;
  isFavorite?: boolean;
  onClick?: () => void;
};

const PokemonItem = ({ name }: PokemonItemProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    console.log("toggleFavorite");
    setIsFavorite(!isFavorite);
  };

  return (
    <li key={name} className={styles.pokemonItem}>
      <a href={""}>{name}</a>
      <Button icon={isFavorite ? "/star_selected.svg" : "/star.svg"} onClick={toggleFavorite} />
    </li>
  );
};

export default PokemonItem;
