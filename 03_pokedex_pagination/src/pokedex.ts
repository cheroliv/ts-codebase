interface Pokemon {
    id: number;
    name: string;
}

type Result<T, E> = { type: "success"; value: T } | { type: "error"; error: E };

interface Cursor {
    position: number;
    pokemons: Pokemon[];
}


const fetchPokemonList = async (): Promise<Result<any[], string>> => {
    return fetch(`https://pokeapi.co/api/v2/ability/?limit=358&offset=0`)
        .then(response =>
            response.ok
                ? response.json()
                : Promise.reject(`Network response was not ok: ${response.status}`)
        )
        .then(data => ({ type: "success", value: data.results }))
        .catch(error => ({ type: "error", error: error.message }));
};

const fetch_pokemons = async (): Promise<Array<Pokemon>> => {
    let pokes: Array<Pokemon> = [];
    await fetchPokemonList()
        .then(result =>
            result.type === "success"
                ? result.value.map((it: { name: string; url: string }) => [
                    parseInt(it.url
                        .replace("https://pokeapi.co/api/v2/ability/", "")
                        .replace("/", "")
                    ),
                    it.name,
                ])
                : []
        )
        .then(
            (res): Array<Pokemon> =>
                res.map((it: Array<string | number>) => {
                    return { id: it[0], name: it[1] } as Pokemon;
                })
        )
        .then((it: Array<Pokemon>): Array<Pokemon> => {
            pokes = [...it];
            return pokes;
        })
        .catch(err => {
            console.error("Une erreur s'est produite :", err);
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
};

export { display_pokemons, fetch_pokemons };
