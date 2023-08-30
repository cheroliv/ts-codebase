import './style.css';
import './styles.scss'
import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';
import bootstrapLogo from './bootstrap.svg';

interface Pokemon {
  id: Number;
  name: String;
};

type Result<T, E> = { type: 'success'; value: T } | { type: 'error'; error: E };

const fetchPokemonList = async (): Promise<Result<any[], string>> => {
  return fetch(`https://pokeapi.co/api/v2/ability/?limit=358&offset=0`)
    .then(response => response.ok
      ? response.json()
      : Promise.reject(`Network response was not ok: ${response.status}`)
    )
    .then(data => ({ type: 'success', value: data.results }))
    .catch(error => ({ type: 'error', error: error.message }));
};

const fetch_pokemons = async (): Promise<Array<Pokemon>> => {
  let pokes: Array<Pokemon> = []
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
    ).then((res): Array<Pokemon> => res.map((it: Array<string | number>) => {
      return { "id": it[0], "name": it[1] } as Pokemon
    })).then((it: Array<Pokemon>): Array<Pokemon> => {
      pokes = [...it];
      return pokes;
    }).catch(err => {
      console.error('Une erreur s\'est produite :', err);
    });
  return pokes;
};

const display_pokemons = (pokes: Array<Pokemon>) => {
  const table = document.getElementById("data-table");
  const tbody = document.getElementById("table-body");
  if (table && tbody) {
    let html = "";
    pokes.forEach((it: Pokemon) => {
      html += `
        <tr>
          <td>${it.name}</td>
          <td>${it.id}</td>
        </tr>
      `;
    });
    tbody.innerHTML = html;
  }
}


document.querySelector<HTMLDivElement>('#stack')!.innerHTML = `
  <div id="stack">
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" 
            class="logo" 
            alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" 
            class="logo vanilla" 
            alt="TypeScript logo" />
    </a>
    <a href="https://getbootstrap.com/" target="_blank">
      <img src="${bootstrapLogo}" 
            class="logo vanilla" 
            alt="Bootstrap logo" />
    </a>
    </div>
    `;

const pokemons: Array<Pokemon> = await fetch_pokemons();
console.assert(pokemons.length == 358);
display_pokemons(pokemons);

interface Cursor {
  position: Number;
  pokemons: Pokemon[];
};

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
    position: cursor.position as number + 1,
    pokemons: pokemons.slice(
      (cursor.position as number) * 10 + 1,
      (cursor.position as number) * 10 + 1 + 10)
  };
}

const prev_pokemon = (cursor: Cursor): Cursor => {
  return {
    position: cursor.position as number + 1,
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

