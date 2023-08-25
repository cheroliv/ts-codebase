const fetchPokemonList = async (): Promise<any> => {
    const apiUrl = 'https://pokeapi.co/api/v2/ability/?limit=20&offset=20';

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }

        const data = await response.json();
        return data.results;
    } catch (error) {
        throw error;
    }
};

/**
 * min id pokemon 1
 * max id pokemon 299
 */

export const fetchAndLogPokemonList = async () => {
    try {
        (await fetchPokemonList())
            .map((it: { name: String; url: String; }) => [
                parseInt(it.url.replace("https://pokeapi.co/api/v2/ability/", "")
                    .replace("/", "")), it.name
            ])
            .forEach((element: Array<String | Number>) => {
                console.log(element[0] + ", " + element[1]);
            });
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
    }
};

fetchAndLogPokemonList();