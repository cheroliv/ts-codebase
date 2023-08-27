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
   Pokemons  
  </p>
    <table class="table" id="data-table">
    <thead>
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Id</th>
        </tr>
    </thead>
    <tbody class="table-group-divider" id="table-body">
    </tbody>
  </table>
</div>
`;

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);

interface Pokemon {
  id: Number;
  name: String;
};

const pokemons: Array<Pokemon> = [];

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
    ).then((mappedResults): Array<Pokemon> => mappedResults.map((element: Array<string | number>) => {
      return { "id": element[0], "name": element[1] } as Pokemon
    })).then((it: Array<Pokemon>): Array<Pokemon> => {
      pokemons = [...it];
      return pokemons
    }).catch(error => {
      console.error('Une erreur s\'est produite :', error);
    });
  return pokemons;
};

const display_pokemons = () => {
  const dataTable = document.getElementById("data-table");
  const tableBody = document.getElementById("table-body");
  if (dataTable && tableBody) {
    let tableHTML = "";
    pokemons.forEach((pokemon) => {
      tableHTML+=`
        <tr>
          <td>${pokemon.name}</td>
          <td>${pokemon.id}</td>
        </tr>
      `;
    });
    tableBody.innerHTML = tableHTML;
  }
}

fetch_pokemons()
  .then((p: Array<Pokemon>) => pokemons.push(...p))
  .then(() => display_pokemons());