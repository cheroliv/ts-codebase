/**
 * Les classes:
 * members,
 * visibility,
 * nommage,
 * accesseurs
 * scope identifier: static,private,protected
 */

class Member {
    username: String = "";
    email: String = "";
    /**
    * convention de nommage :
    * Les membres private sont préfixés avec un _
    */
    private _password: String = "";

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
}


let domenico = Member.fromAuthor(author);

console.assert(domenico.email === "Domenico.Losurdo@acme.com");
domenico.password = "test";

console.assert(domenico.password === "test");