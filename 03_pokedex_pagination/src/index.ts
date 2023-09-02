import "./styles.scss";
import "./style.css";
import hero from "./hero";
import {
  Cursor,
  display_pokemons,
  fetch_pokemons,
  Pokemon
} from "./pokedex";

hero();

const pokemons: Array<Pokemon> = await fetch_pokemons();

console.assert(pokemons.length == 358);

display_pokemons(pokemons);

const first_cursor: Cursor = {
  position: 1,
  pokemons: pokemons.slice(0, 10),
};

const last_cursor: Cursor = {
  position: Math.floor(pokemons.length / 10) + 1,
  pokemons: pokemons.slice(
    Math.floor(pokemons.length / 10) * 10 + 1,
    pokemons.length),
};

const next_pokemon = (cursor: Cursor): Cursor => {
  return {
    position: (cursor.position as number) + 1,
    pokemons: pokemons.slice(
      (cursor.position as number) * 10 + 1,
      (cursor.position as number) * 10 + 1 + 10)
  };
};

const prev_pokemon = (cursor: Cursor): Cursor => {
  return {
    position: (cursor.position as number) + 1,
    pokemons: pokemons.slice(
      (cursor.position as number) * 10 + 1,
      (cursor.position as number) * 10 + 1 + 10)
  };
};

const pokemon_navigation = () => {
  console.table(next_pokemon(first_cursor));
  console.table(prev_pokemon(last_cursor));
};

pokemon_navigation();

export { sum } from "./sum";
