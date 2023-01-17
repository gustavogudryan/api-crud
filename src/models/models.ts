import { v4 } from "uuid";

export class User {
    username: string;
    email: string;
    password: string

    constructor(username: string, email: string, password: string){
        this.username = username;
        this.email = email;
        this.password = password
    }
}

export class Note {
    userEmail: string;
    id: string;
    title: string;
    description: string;

    constructor(userEmail: string, title: string, description: string) {
        this.userEmail = userEmail
        this.id = v4();
        this.title = title;
        this.description = description;
    }
}