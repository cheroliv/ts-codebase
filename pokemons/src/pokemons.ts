import './style.css';
import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);


type Result<T, E> = { type: 'success'; value: T } | { type: 'error'; error: E };

const fetchPokemonList = async (cursor: Cursor): Promise<Result<any[], string>> => {
  return fetch(`https://pokeapi.co/api/v2/ability/?limit=${cursor.limit}&offset=${cursor.offset}`)
    .then(response => response.ok
      ? response.json()
      : Promise.reject(`Network response was not ok: ${response.status}`)
    )
    .then(data => ({ type: 'success', value: data.results }))
    .catch(error => ({ type: 'error', error: error.message }));
};

export interface Pokemon {
  id: Number;
  name: String;
};

const fetch_pokemons = async (cursors: Array<Cursor>): Promise<Array<Pokemon>> => {
  let pokemons: Array<Pokemon> = []
  //  cursors.forEach(cursor => {
  await fetchPokemonList(cursors[0])
    .then(result => result.type === 'success'
      ? result.value.map((it: { name: string; url: string }) => [
        parseInt(it
          .url
          .replace("https://pokeapi.co/api/v2/ability/", "")
          .replace("/", "")),
        it.name,
      ])
      : []
    ).then((mappedResults): Array<Pokemon> => mappedResults.map((element: Array<string | number>) => {
      return { "id": element[0], "name": element[1] } as Pokemon
    })).then((it: Array<Pokemon>): Array<Pokemon> => {
      pokemons = [...it];
      return pokemons
    }).catch(error => {
      console.error('Une erreur s\'est produite :', error);
    });
  // });  
  return pokemons;
};

interface Cursor {
  limit: Number,
  offset: Number
};

const MAX_POKEMON = 298;
const MIN_POKEMON = 1;
const OFFSET_DEFAULT = 20;

const structuredPagination = (): Array<Cursor> => {
  const cursors: Array<Cursor> = []
  for (let i = 0; i <= MAX_POKEMON; i = i + OFFSET_DEFAULT) {
    cursors.push({ "limit": i, "offset": OFFSET_DEFAULT } as Cursor)
  };
  cursors.push({
    "limit": MAX_POKEMON - Math.floor(MAX_POKEMON / OFFSET_DEFAULT),
    "offset": MAX_POKEMON
  } as Cursor);
  return cursors;
};

console.table(structuredPagination());
console.table(await fetch_pokemons([{ "limit": 20, "offset": 0 }]));
