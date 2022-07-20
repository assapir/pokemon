#!/usr/bin/env node

const API_URL = "https://pokeapi.co/api/v2/pokemon";

let maxPokemonId = 0;

const getMaxPokemonId = async () => {
  if (maxPokemonId) {
    return maxPokemonId;
  }

  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon`s :( ");
  }

  const data = await response.json();
  maxPokemonId = data.count;
  return maxPokemonId;
};

const getRandomPokemonId = async () => {
  const max = await getMaxPokemonId();
  return Math.floor(Math.random() * (max - 1)) + 1;
};

const getPokemon = async () => {
  const id = await getRandomPokemonId();
  const response = await fetch(`${API_URL}/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon with id ${id} :( `);
  }

  return response.json();
};

const run = async () => {
  try {
  const pokemon = await getPokemon();
  console.log(`I choose you! \x1b[32m${pokemon.name}-${pokemon.types[0].type.name}-${pokemon.moves.length}\x1b[0m`);
  } catch (err) {
    console.log(err.message);
  }
};

await run();
