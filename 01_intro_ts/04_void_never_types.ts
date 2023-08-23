// Le type void est l'opposé du type any
// c'est l'absence de type.
function verify_writers_length(): void {
    console.assert(writers.length > 0);
}

verify_writers_length();

const verify_writers_length_arrow = (): void =>
    console.assert(writers.length > 0);

verify_writers_length_arrow();

//Type of et never
let value = 30;
console.assert(typeof value === "number");

//never: qqchs qui n'arrive jamais
function foo(x: String | Number): Boolean {
    if (typeof x === "string") {
        return true;
    } else if (typeof x === "number") {
        return false;
    }
    return fail("Error!")
}

function fail(message: String): never {
    throw new Error(message as string);
}

