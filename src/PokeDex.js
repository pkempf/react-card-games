import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { useAxios } from "./hooks";
import PokemonSelect from "./PokemonSelect";
import PokemonCard from "./PokemonCard";
import "./PokeDex.css";

/* Renders a list of pokemon cards.
 * Can also add a new card at random,
 * or from a dropdown of available pokemon. */
function PokeDex() {
  //   const [pokemon, setPokemon] = useState([]);
  //   const addPokemon = async (name) => {
  //     const response = await axios.get(
  //       `https://pokeapi.co/api/v2/pokemon/${name}/`
  //     );
  //     setPokemon((pokemon) => [...pokemon, { ...response.data, id: uuid() }]);
  //   };

  const [pokemon, addPokemon, clearPokemon] = useAxios(
    "https://pokeapi.co/api/v2/pokemon/"
  );

  const formatPokemon = (data) => {
    return {
      id: uuid(),
      front: data.sprites.front_default,
      back: data.sprites.back_default,
      name: data.name,
      stats: data.stats.map((stat) => ({
        value: stat.base_stat,
        name: stat.stat.name,
      })),
    };
  };

  const selectPokemon = (pokemonName) => addPokemon(formatPokemon, pokemonName);

  return (
    <div className="PokeDex">
      <div className="PokeDex-buttons">
        <h3>Please select your pokemon:</h3>
        <PokemonSelect add={selectPokemon} clear={clearPokemon} />
      </div>
      <div className="PokeDex-card-area">
        {pokemon.map((cardData) => (
          <PokemonCard
            key={cardData.id}
            front={cardData.front}
            back={cardData.back}
            name={cardData.name}
            stats={cardData.stats}
          />
        ))}
      </div>
    </div>
  );
}

export default PokeDex;
