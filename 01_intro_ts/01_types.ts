/**
 * Les types en typescript
 */

//quand le type n'est pas defini des le debut,
// alors il est réassignable
// c'est le type Any qui est attribué par défaut
let my_var;
my_var = "username";
console.assert(my_var === "username");
my_var = 11;
console.assert(my_var === 11);
my_var = true;
console.assert(my_var === true);

let age = 1;
console.assert(age === 1);
age = 2;
// age="trois" c'est impossible 
// car l'inference de type a attribué le type number
console.assert(age === 2);

// Déclaration explicite de type  
let pi: Number = 3.14;
console.assert(typeof pi === "number");
