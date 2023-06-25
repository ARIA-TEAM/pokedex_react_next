"use client";

import axios from "axios";
import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  lazy,
  use,
} from "react";
// styles
import styles from "./page.module.scss";
// components
import Loader from "../components/Loader/Loader";
import Navigation from "../components/Navigation/Navigation";
// dynamic component
const PokemonList = lazy(() => import("../components/PokemonList/PokemonList"));

interface Pokemon {
  name: string;
}

export default function List() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [favoritePokemons, setFavoritePokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("all");
  const allPokemonRef = useRef<Pokemon[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [isFetching, setIsFetching] = useState(false);

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
    page === "all" && getPokemonList();
  };

  const getPokemonList = useCallback(async () => {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
    const allPokemon = response.data.results;

    allPokemonRef.current = allPokemon;
    setNextPageUrl(response.data.next);
    setPokemonList(allPokemon);
    setIsLoading(false);
  }, []);

  const loadMorePokemons = useCallback(async () => {
    if (nextPageUrl) {
      try {
        const response = await axios.get(nextPageUrl);
        const data = response.data;
        setPokemonList([...pokemonList, ...data.results]);
        setNextPageUrl(data.next);
      } catch (error) {
        console.log("Error loading more Pokémon:", error);
      }
    }
  }, [nextPageUrl, pokemonList]);

  useEffect(() => {
    getPokemonList();
  }, [getPokemonList]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        !isFetching
      ) {
        setIsFetching(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFetching]);

  useEffect(() => {
    if (!isFetching) return;
    loadMorePokemons();
    setIsFetching(false);
  }, [isFetching, loadMorePokemons]);

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
