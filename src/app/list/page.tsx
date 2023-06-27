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
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [isFetching, setIsFetching] = useState(false);
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
    page === "all" && getPokemonList();
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleModalPokemon = (pokemon: Pokemon) => {
    setModalPokemon(pokemon);
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
            <SearchBox />
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
