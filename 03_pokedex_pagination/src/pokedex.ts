interface Pokemon {
    id: number;
    name: string;
}

type Result<T, E> = { type: "success"; value: T } | { type: "error"; error: E };

interface Cursor {
    position: number;
    pokemons: Pokemon[];
}