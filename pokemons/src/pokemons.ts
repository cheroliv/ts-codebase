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

export const fetchAndLogPokemonList = async () => {
  await fetchPokemonList()
    .then(result => result.type === 'success'
      ? result.value.map((it: { name: string; url: string }) => [
          parseInt(it.url.replace("https://pokeapi.co/api/v2/ability/", "").replace("/", "")),
          it.name,
        ])
      : []
    )
    .then(mappedResults => mappedResults.forEach((element: Array<string | number>) => {
      console.log(element[0] + ", " + element[1]);
    }))
    .catch(error => {
      console.error('Une erreur s\'est produite :', error);
    });
};

fetchAndLogPokemonList();
