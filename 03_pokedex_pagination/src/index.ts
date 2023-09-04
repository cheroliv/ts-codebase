import "./styles.scss";
import "./style.css";
import hero from "./hero";
import { pokemons, display_pokemons, pokemon_navigation } from "./pokedex";

hero();
pokemon_navigation();
display_pokemons(pokemons);

export { sum } from "./sum";
