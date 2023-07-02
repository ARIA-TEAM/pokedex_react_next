"use client";

import { useEffect, useRef, useState } from "react";

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

  const modalRef = useRef<HTMLDivElement>(null); // Reference to the modal element

  const getPokemon = async () => {
    if (!pokemon) return null;
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

  const capitalize = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const formatTypes = (types: any[]) => {
    const formattedTypes = types.map((type: any) => capitalize(type.type.name));
    if (formattedTypes.length > 1) {
      const lastType = formattedTypes.pop();
      return (
        formattedTypes.join(", ") +
        (lastType ? " and " + lastType.toLowerCase() : "")
      );
    } else {
      return formattedTypes[0];
    }
  };

  const copyToClipboard = () => {
    const name = capitalize(pokemonInfo.name);
    const weight = `${pokemonInfo.weight / 10}kg`;
    const height = `${pokemonInfo.height / 10}m`;
    const types = formatTypes(pokemonInfo.types);

    const textToCopy = `*Name*: ${name}\nWeight: ${weight}\nHeight: ${height}\nTypes: ${types}`;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        console.log("Copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy to clipboard", error);
      });
  };

  const closeModal = () => {
    handleShowModal();
  };

  useEffect(() => {
    getPokemon();

    // Add event listener to handle clicks outside the modal
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      {pokemonInfo && (
        <div className={styles.pokemonmodal}>
          <div className={styles.pokemonmodal__body} ref={modalRef}>
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
                <strong>Name:</strong> {capitalize(pokemonInfo.name)}
              </div>
              <div className={styles.pokemonmodal__info__item}>
                <strong>Weight:</strong> {pokemonInfo.weight / 10}kg
              </div>
              <div className={styles.pokemonmodal__info__item}>
                <strong>Height:</strong> {pokemonInfo.height / 10}m
              </div>
              <div className={styles.pokemonmodal__info__item}>
                <strong>Type:</strong>
                <ul className={styles.pokemonmodal__types}>
                  <li>{formatTypes(pokemonInfo.types)}</li>
                </ul>
              </div>
              <div className={styles.pokemonmodal__btns}>
                <Button text="Share to my friends" onClick={copyToClipboard} />
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
