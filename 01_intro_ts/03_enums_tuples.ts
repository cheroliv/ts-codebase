/**
 * Enums et Tuples
 * 
 * Enum: il existe les enums numérique 
 * et les enums chaine de caracteres.
 * 
 * Tuple: similaire aux arrays mais ne peut
 * contenir qu'une valeur de type spécifié.
 * 
 */

//Enum numérique
// l'index par de debut défaut est 0
// ici on le place a 1
enum Week {
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
    Sunday = 7,
};

console.assert(Week.Monday == 1);
console.assert(Week.Tuesday == 2);
console.assert(Week.Wednesday == 3);
console.assert(Week.Thursday == 4);
console.assert(Week.Friday == 5);
console.assert(Week.Saturday == 6);
console.assert(Week.Sunday == 7);

console.assert(Week[1] === "Monday");
console.assert(Week[2] === "Tuesday");
console.assert(Week[3] === "Wednesday");
console.assert(Week[4] === "Thursday");
console.assert(Week[5] === "Friday");
console.assert(Week[6] === "Saturday");
console.assert(Week[7] === "Sunday");

let motd_arr_fr: String[] = [
    "Associé à la Lune",
    "Du dieu Tiw, associé à Mars",
    "Du dieu germanique Odin",
    "Du dieu germanique du tonnerre Thor",
    "De la déesse germanique Frigga associée à Vénus",
    "Associé à Saturne",
    "Associé au Soleil",
];

let motd_arr_en: String[] = [
    "associated with the Moon",
    "from the god Tiw, associated with Mars",
    "from Germanic god Odin",
    "from Germanic god of thunder Thor",
    "from Germanic goddess Frigga associated with Venus",
    "associated with Saturn",
    "associated with the Sun",
];

// Un tuple (triple)
let monday_triple_fr: [
    Number,
    String,
    String
] = [
        Week.Monday,
        Week[Week.Monday],
        motd_arr_fr[0],
    ];


console.assert(monday_triple_fr[0] === 1);
console.assert(monday_triple_fr[1] === "Monday");
console.assert(monday_triple_fr[2] === "Associé à la Lune");


let monday_triple_en: [
    Number,
    String,
    String
] = [
        Week.Monday,
        Week[Week.Monday],
        motd_arr_en[0],
    ];

console.assert(monday_triple_en[0] === 1);
console.assert(monday_triple_en[1] === "Monday");
console.assert(monday_triple_en[2] === "associated with the Moon");


// On se fait un type pour ajouter le nom de la langue
type Meaning_of_the_day = {
    lang: String,
    meaning: (Week | String)[][],
};

//fonction d'affichage du type Meaning_of_the_day
const display_motd = (motd: Meaning_of_the_day) => {
    motd.meaning.forEach(day =>
        console.table(`${Week[day[0] as Week]}: ${day[1]}.(${motd.lang})`)
    )
};

//fonction d'assertion sur le type Meaning_of_the_day
// afin de verifier la concordance du contenu avec
// motd_arr_#lang#
const test_motd = (
    motd: Meaning_of_the_day,
    motd_arr: String[]
) => {
    console.assert(motd.lang.length === 2)
    for (const [i, value] of motd.meaning.entries()) {
        console.assert(value[1] === motd_arr[i]);
    }
};


let motd_fr: Meaning_of_the_day = {
    lang: "fr",
    meaning: [
        [Week.Monday, motd_arr_fr[0]],
        [Week.Tuesday, motd_arr_fr[1]],
        [Week.Wednesday, motd_arr_fr[2]],
        [Week.Thursday, motd_arr_fr[3]],
        [Week.Friday, motd_arr_fr[4]],
        [Week.Saturday, motd_arr_fr[5]],
        [Week.Sunday, motd_arr_fr[6]],
    ],
}

// console.log("---------");
// console.log("display_motd(motd_fr):");
// display_motd(motd_fr);
test_motd(motd_fr, motd_arr_fr)


let motd_en: Meaning_of_the_day = {
    lang: "en",
    meaning: [
        [Week.Monday, motd_arr_en[0]],
        [Week.Tuesday, motd_arr_en[1]],
        [Week.Wednesday, motd_arr_en[2]],
        [Week.Thursday, motd_arr_en[3]],
        [Week.Friday, motd_arr_en[4]],
        [Week.Saturday, motd_arr_en[5]],
        [Week.Sunday, motd_arr_en[6]],
    ],
}

// console.log("---------");
// console.log("display_motd(motd_en):");
// display_motd(motd_en);
// console.log("---------");
test_motd(motd_en, motd_arr_en);

// Un tuple (triple) utilisant le type 
// Meaning_of_the_day pour peupler le meaning
let motd_triple: [
    Number,
    String,
    String
] = [
        Week.Monday,
        Week[Week.Monday],
        motd_fr.meaning[0][1] as String
    ];

console.assert(motd_triple[0] === 1);
console.assert(motd_triple[1] === "Monday");
console.assert(motd_triple[2] === "Associé à la Lune");