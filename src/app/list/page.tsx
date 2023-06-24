"use client";

import axios from "axios";
import { useState, useEffect, useMemo, useCallback, useRef, use } from "react";
// styles
import styles from "./page.module.scss";
// components
import Loader from "../components/Loader/Loader";
import PokemonList from "../components/PokemonList/PokemonList";
import Navigation from "../components/Navigation/Navigation";

interface Pokemon {
  name: string;
}

export default function List() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [favoritePokemons, setFavoritePokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("all");
  const allPokemonRef = useRef<Pokemon[]>([]);

  const isFavorite = useMemo(() => {
    return (pokemon: Pokemon) => {
      return favoritePokemons.some(
        (favorite) => favorite.name === pokemon.name
      );
    };
  }, [favoritePokemons]);

  const toggleFavorite = useCallback(
    (pokemon: Pokemon) => {
      const isAlreadyFavorite = isFavorite(pokemon);
      const updatedFavorites = isAlreadyFavorite
        ? favoritePokemons.filter((favorite) => favorite.name !== pokemon.name)
        : [...favoritePokemons, pokemon];
      setFavoritePokemons(updatedFavorites);
    },
    [favoritePokemons, isFavorite]
  );

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const getPokemonList = useCallback(async () => {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=-1");
    const allPokemon = response.data.results;

    allPokemonRef.current = allPokemon;
    setPokemonList(allPokemon);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getPokemonList();
  }, [getPokemonList]);

  useEffect(() => {
    console.log("currentPage", currentPage);
  }, [currentPage]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.main}>
            <h1>Pokemon Search</h1>
            <PokemonList
              pokemons={currentPage === "all" ? pokemonList : favoritePokemons}
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
          </div>
          <div className={styles.foating}>
            <Navigation
              handlePageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </>
      )}
    </>
  );
}
