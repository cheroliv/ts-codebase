/***
 * Structure de données:
 * Avec le type any on peut changer 
 * le type de la variable à tout instruction
 * Lorsque l'on fixe le type 
 * alors il n'est plus possible de le changer
 * lors d'une assignation
 */

// Arrays
let buddies: any[] = [
    "cheroliv",
    "imrandeh",
    "issoudeh",
    "soumi92"
]

console.assert(buddies[0] === "cheroliv");
console.assert(buddies[1] === "imrandeh");
console.assert(buddies[2] === "issoudeh");
console.assert(buddies[3] === "soumi92");
// Déclaré en type any, l'inference de type 
// a bien réaligné en type string
console.assert(typeof buddies[0] === "string");
console.assert(typeof buddies[1] === "string");
console.assert(typeof buddies[2] === "string");
console.assert(typeof buddies[3] === "string");



let writers: (String | String | String | Number)[][] = [
    ["Chrétien", "de Troyes", "fr", 12],
    ["François", "Rabelais", "fr", 16],
    ["René", "Descartes", "fr", 17],
    ["Jean-Jacques", "Rousseau", "fr", 18],
    ["Georg", "Hegel", "de", 19],
    ["Karl", "Marx", "de", 19],
    ["Friedrich", "Engels", "de", 19],
    ["Victor", "Hugo", "fr", 19],
    ["Paul", "Verlaine", "fr", 19],
    ["Arthur", "Rimbaud", "fr", 19],
    ["Gérard", "de Nerval", "fr", 19],
    ["Georg", "Lukacs", "hu", 20],
    ["Franz", "Kafka", "hu", 20],
    ["Antonio", "Gramsci", "it", 20],
    ["Domenico","Losurdo","it",20],
];

// console.table(writers);


// Objects
let author: {
    first_name: String,
    last_name: String,
    lang: String,
    century: Number
} = {
    // slice(-1) renvoie le dernier élèment
    first_name: writers.slice(-1)[0][0] as String,
    last_name: writers.slice(-1)[0][1] as String,
    lang: writers.slice(-1)[0][2] as String,
    century: writers.slice(-1)[0][3] as Number,
}


// assertion sur la valeur en accés par encapsulation(dot)
console.assert(author.first_name === "Antonio")
console.assert(author.last_name === "Gramsci")
console.assert(author.lang === "it")
console.assert(author.century === 20);

// assertion sur le type en accès par index
console.assert(typeof author["first_name"] === "string")
console.assert(typeof author["last_name"] === "string")
console.assert(typeof author["lang"] === "string")
console.assert(typeof author["century"] === "number");