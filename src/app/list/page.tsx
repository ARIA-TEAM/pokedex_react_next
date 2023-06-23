"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import PokemonItem from "../components/PokemonItem/PokemonItem";

export default function List() {
  const [pokemonList, setPokemonList] = useState([]);

  const getPokemonList = async () => {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=-1"
    );
    setPokemonList(response.data.results);
  };

  useEffect(() => {
    getPokemonList();
  }, []);

  return (
    <>
      {pokemonList.length > 0 ? (
        <div>
          <h1>Pokemon Search</h1>
          <ul>
            {pokemonList.map(({ name }) => (
              <PokemonItem key={name} name={name} />
            ))}
          </ul>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
