import { IMessage } from "./message.interface";

export interface IUser {
    id?: string,
    name: string,
    email: string,
    password: string,
    repassword: string,
    messages?: Array<IMessage>
}

export interface ILoggedUser {
    id?: string,
    name: string,
}

