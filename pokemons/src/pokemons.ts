
type Result<T, E> = { type: 'success'; value: T } | { type: 'error'; error: E };

const fetchPokemonList = async (): Promise<Result<any[], string>> => {
  const apiUrl = 'https://pokeapi.co/api/v2/ability/?limit=20&offset=20';

  return fetch(apiUrl)
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

export const fetchPokemons = async (): Promise<Array<Pokemon>> => {
  let pokemons: Array<Pokemon> = []
  await fetchPokemonList()
    .then(result => result.type === 'success'
      ? result.value.map((it: { name: string; url: string }) => [
        parseInt(it
          .url
          .replace("https://pokeapi.co/api/v2/ability/", "")
          .replace("/", "")),
        it.name,
      ])
      : []
    )
    .then((mappedResults): Array<Pokemon> => mappedResults.map((element: Array<string | number>) => {
      return { "id": element[0], "name": element[1] } as Pokemon
    }))
    .then((it: Array<Pokemon>): Array<Pokemon> => {
      pokemons = [...it];
      return pokemons
    }
    )
    .catch(error => {
      console.error('Une erreur s\'est produite :', error);
    });
  return pokemons;
};

interface Cursor {
  limit: Number,
  offset: Number
}

const MAX_POKEMON = 298
const MIN_POKEMON = 1
const OFFSET_DEFAULT = 20

export const structurePagination = () => {
  // console.log("foo");
//   const num_paquet = Math.floor(MAX_POKEMON / OFFSET_DEFAULT)
//   // console.log(num_paquet);
//   const num_last_paquet = num_paquet * OFFSET_DEFAULT;
//   // console.log(num_last_paquet) 
//   // console.log(MAX_POKEMON-);

//   const cursors: Array<Cursor> = []//Array(Math.floor(MAX_POKEMON/OFFSET_DEFAULT)+1)
//   console.log(cursors.length);
//   // for (let i = 1; i <= MAX_POKEMON; i =+ OFFSET_DEFAULT) {
//     // console.log(i)
//     // if (i === 1) cursors.push({ "limit": i, "offset": i + OFFSET_DEFAULT } as Cursor)
//     // else {
//       // cursors.push({ "limit": i + 1, "offset": i + 1 + OFFSET_DEFAULT } as Cursor)
//     // }
//   // }
//   // cursors.push({ "limit": MAX_POKEMON - Math.floor(MAX_POKEMON / OFFSET_DEFAULT), "offset": MAX_POKEMON } as Cursor)
//   console.table(cursors)
}