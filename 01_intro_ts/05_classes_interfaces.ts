/**
 * Les classes:
 * members,
 * visibility,
 * nommage,
 * accesseurs
 * scope identifier: static,private,protected
 * 
 * convention de nommage :
 * Les membres private sont préfixés avec un _ * 
 */

// Interface donne un contrat à un type
interface IPerson {
    username: String;
    email: String;
    readonly signup_date: Date;
}

class Member implements IPerson {
    username: String = "";
    email: String = "";
    private _password: String = "";
    readonly signup_date: Date = new Date(Date.now());

    constructor(username: String, email: String) {
        this.username = username;
        this.email = email;
    }

    get password(): String {
        return this._password;
    }

    set password(new_password: String) {
        this._password = new_password;
    }

    /**
     * Une fonction static qui initilise un member,
     * à partir d'un author
     */
    static fromAuthor(author: {
        first_name: String,
        last_name: String,
        lang: String,
        century: Number
    }): Member {
        return new Member(
            `${author.first_name}.${author.last_name}`,
            `${author.first_name}.${author.last_name}@acme.com`,
        );
    }
};


let domenico = Member.fromAuthor(author);
domenico.password = "test";

console.assert(domenico.email === "Domenico.Losurdo@acme.com");
console.assert(domenico.password === "test");



const user1: IPerson = {
    username: Member.fromAuthor(author)["username"],
    email: Member.fromAuthor(author)["email"],
    signup_date: Member.fromAuthor(author)["signup_date"],
}

console.assert(user1.email === "Domenico.Losurdo@acme.com");
console.assert(user1.username === "Domenico.Losurdo");



// Héritage
enum Shapes {
    Undefined = 0,
    Polygones = 1,
    Circle = 2,
    Straight = 3,
    Segment = 4,
};

class Shape {
    type: Shapes = Shapes.Undefined;
};

class Rectangle extends Shape {
    h: Number = 0;
    w: Number = 0;
};

class Square extends Rectangle {
    side: Number = 0;
};

//Interface et HOF
//interface signature sans nom

//Interface et Arrays