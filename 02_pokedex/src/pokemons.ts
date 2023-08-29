import { setupCounter } from './counter';
import './style.css';
import './styles.scss'
import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';
import bootstrapLogo from './bootstrap.svg';

<<<<<<< HEAD:02_pokedex/src/pokemons.ts
=======
import { setupCounter } from './counter';
import './styles.scss'
>>>>>>> 811dba7a826bdb54bc4c130e71ff1eb5c60ac720:02_pokemons/src/pokemons.ts

interface Pokemon {
  id: Number;
  name: String;
};

const pokemons: Array<Pokemon> = [];

document.querySelector<HTMLDivElement>('#pokedex')!.innerHTML = `
<div class="container py-4 px-3 mx-auto">
<h1>Pokedex</h1>
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

  <div class="card">
    <button id="counter" type="button"></button>
  </div>
  <p class="read-the-docs">
   Pokemons  
  </p>
  <table id="data-table"
<<<<<<< HEAD:02_pokedex/src/pokemons.ts
         class="table table-bordered table-hover">
=======
         class="table table-dark table-bordered table-hover">
>>>>>>> 811dba7a826bdb54bc4c130e71ff1eb5c60ac720:02_pokemons/src/pokemons.ts
    <thead class="table-warning">
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Id</th>
        </tr>
    </thead>
    <tbody id="table-body"
          class="table-group-divider">
    </tbody>
  </table>
</div>
`;

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);

const display_pokemons = () => {
  const dataTable = document.getElementById("data-table");
  const tableBody = document.getElementById("table-body");
  if (dataTable && tableBody) {
    let tableHTML = "";
    pokemons.forEach((pokemon:Pokemon) => {
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

fetch_pokemons()
  .then((p: Array<Pokemon>) => pokemons.push(...p))
  .then(() => display_pokemons());