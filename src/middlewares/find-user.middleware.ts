import { NextFunction, Request, Response } from "express";
import { userlist } from "../data/user.data";
import { IUser } from "../interfaces";
import { user } from "../services";

  export function findUserLogin(req: Request, res: Response, next: NextFunction){
    const {email, password} = req.body

    const loggedUser = userlist.find((user: IUser) => (user.email === email && user.password === password))

    if(!loggedUser){
        return res.status(422).json({
            sucess:false,
            message: "Email ou senha não conferem",
            data: null
        })
    }

    next()
  }
  