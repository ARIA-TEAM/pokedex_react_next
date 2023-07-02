"use client";

import axios from "axios";
import { useState, useEffect, useMemo, useCallback, useRef, lazy } from "react";
// styles
import styles from "./page.module.scss";
// components
import Loader from "../components/Loader/Loader";
import Navigation from "../components/Navigation/Navigation";
import SearchBox from "../components/SearchBox/SearchBox";
import PokemonModal from "../components/PokemonModal/PokemonModal";
// dynamic component
const PokemonList = lazy(() => import("../components/PokemonList/PokemonList"));

interface Pokemon {
  name: string;
  url: string;
}

export default function List() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [favoritePokemons, setFavoritePokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("all");
  const allPokemonRef = useRef<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  // modal
  const [showModal, setShowModal] = useState(false);
  const [modalPokemon, setModalPokemon] = useState<Pokemon | null>(null);

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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // if page is home, filter all pokemons
    const filteredPokemons = allPokemonRef.current.filter((pokemon) =>
      pokemon.name.includes(query)
    );
    // if page is favorites, filter favorite pokemons
    const filteredFavorites = favoritePokemons.filter((pokemon) =>
      pokemon.name.includes(query)
    );
    // set filtered pokemons
    currentPage === "all"
      ? setPokemonList(filteredPokemons)
      : setFavoritePokemons(filteredFavorites);
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleModalPokemon = (pokemon: Pokemon) => {
    setModalPokemon(pokemon);
  };

  const getPokemonList = useCallback(async () => {
    setIsLoading(true);
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=-1"
    );
    const allPokemon = response.data.results;

    allPokemonRef.current = allPokemon;
    setPokemonList(allPokemon);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getPokemonList();
  }, [getPokemonList]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.main}>
            <SearchBox handleSearch={handleSearch} />
            <PokemonList
              pokemons={currentPage === "all" ? pokemonList : favoritePokemons}
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
              handleShowModal={handleShowModal}
              handleModalPokemon={handleModalPokemon}
            />
          </div>
          <div className={styles.foating}>
            <Navigation
              handlePageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
          {showModal && modalPokemon && (
            <PokemonModal
              handleShowModal={handleShowModal}
              pokemon={modalPokemon}
              toggleFavorite={toggleFavorite}
              isFavorite={() => isFavorite(modalPokemon)}
            />
          )}
        </>
      )}
    </>
  );
}
