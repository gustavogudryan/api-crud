import express, { Express } from "express";
import cors from "cors"
import { user } from "./services";
import { validateUser } from "./middlewares/authenticate-user.middleware";
import { findUserLogin } from "./middlewares/find-user.middleware";



const server: Express = express();

server.use(cors());

server.use(express.json())

server.listen(3000, () => {
    console.log("Server Running");
})

// USUARIO

server.get("/users", user.getUsers)
server.get("/users/:id", user.getUserID)
server.post("/users", validateUser, user.createUser)
server.post("/users:login", findUserLogin, user.loginUser)

// MENSAGENS