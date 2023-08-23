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
}