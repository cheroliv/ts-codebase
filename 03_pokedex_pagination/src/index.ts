import "./styles.scss";
import "./style.css";
import hero from "./hero";
import { Cursor, display_pokemons, fetch_pokemons, Pokemon } from "./pokedex";
import { setupCounter } from "./counter";

hero();
setupCounter();

const pokemons: Array<Pokemon> = await fetch_pokemons();

console.assert(pokemons.length == 358);

display_pokemons(pokemons);
/*=============================================================*/
const first_cursor: Cursor = {
  position: 0,
  pokemons: pokemons.slice(0, 10),
};

const last_cursor: Cursor = {
  position: Math.floor(pokemons.length / 10) * 10,
  pokemons: pokemons.slice(
    Math.floor(pokemons.length / 10) * 10,
    pokemons.length
  ),
};

const next_pokemon = (cursor: Cursor): Cursor => {
  if (cursor.position >= last_cursor.position) return last_cursor;
  else
    return {
      position: cursor.position + 10,
      pokemons: pokemons.slice(cursor.position + 10, cursor.position + 20),
    };
};

const prev_pokemon = (cursor: Cursor): Cursor => {
  return {
    position: cursor.position - 10,
    pokemons: pokemons.slice(cursor.position - 10, cursor.position - 20),
  };
};

const pokemon_navigation = () => {
  // console.log(first_cursor);
  // console.log(last_cursor);
  console.table(next_pokemon(first_cursor));
  // console.log(last_cursor.position - 10);
  // console.table(prev_pokemon(last_cursor));
  // console.log(pokemons[350]);
};

pokemon_navigation();

export { sum } from "./sum";
