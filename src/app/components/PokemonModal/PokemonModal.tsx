"use client";

import { useEffect, useState } from "react";

import styles from "./PokemonModal.module.scss";
import Image from "next/image";
import Button from "../Button/Button";

interface Pokemon {
  name: string;
  url: string;
}

type PokemonListProps = {
  pokemon: Pokemon | null;
  handleShowModal: () => void;
  isFavorite: (pokemon: any) => boolean;
  toggleFavorite: (pokemon: any) => void;
};

const PokemonModal = ({
  pokemon,
  handleShowModal,
  isFavorite,
  toggleFavorite,
}: PokemonListProps) => {
  const [pokemonInfo, setPokemonInfo] = useState<any | null>(null);
  const [isFav, setIsFav] = useState(() => isFavorite(pokemon));
  if (!pokemon) return null;
  const getPokemon = async () => {
    const response = await fetch(pokemon.url);
    const data = await response.json();
    setPokemonInfo(data);
  };

  const showModal = () => {
    handleShowModal();
  };

  const setFavorite = (pokemon: any) => {
    toggleFavorite(pokemon);
    setIsFav(!isFav);
  };

  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <>
      {pokemonInfo && (
        <div className={styles.pokemonmodal}>
          <div className={styles.pokemonmodal__body}>
            <div className={styles.pokemonmodal__header}>
              <span className={styles.close} onClick={showModal}></span>
              <Image
                src={
                  pokemonInfo &&
                  pokemonInfo.sprites.other.dream_world.front_default
                }
                width="200"
                height="200"
                alt={pokemonInfo && pokemonInfo.name}
              />
            </div>
            <div className={styles.pokemonmodal__info}>
              <div className={styles.pokemonmodal__info__item}>
                <strong>Name:</strong> {pokemonInfo.name}
              </div>
              <div className={styles.pokemonmodal__info__item}>
                <strong>Weight:</strong> {pokemonInfo.weight}
              </div>
              <div className={styles.pokemonmodal__info__item}>
                <strong>Height:</strong> {pokemonInfo.height}
              </div>
              <div className={styles.pokemonmodal__info__item}>
                <strong>Type:</strong>
                <ul className={styles.pokemonmodal__types}>
                  {pokemonInfo.types.map((type: any) => (
                    <li key={type.type.name}>{type.type.name}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.pokemonmodal__btns}>
                <Button text="Share to my friends" />
                <Button
                  icon={isFav ? "/star_selected.svg" : "/star.svg"}
                  onClick={() => setFavorite(pokemon)}
                  pokemon={pokemon}
                  toggleFavorite={() => setFavorite(pokemon)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonModal;
