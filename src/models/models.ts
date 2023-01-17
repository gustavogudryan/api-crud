import { v4 } from "uuid";

export class User {
    name: string;
    email: string;
    password: string;
    repassword: string;

    constructor(name: string, email: string, password: string, repassword: string){
        this.name = name;
        this.email = email;
        this.password = password;
        this.repassword = repassword;
    }
}

export class Recado {
    userEmail: string;
    id: string;
    title: string;
    description: string;

    constructor(userEmail: string, title: string, description: string) {
        this.userEmail = userEmail;
        this.id = v4();
        this.title = title;
        this.description = description;
    }
}