import { NextFunction, Request, Response } from "express";
import { user } from "../services";


export function validateUser(req: Request, res: Response, next: NextFunction) {
    const { name, email, password, repassword } = req.body;

    const validUser = user.authenticateUser({name, email, password, repassword})

    if(!validUser.sucess){
      return res.json(validUser)
    }

    next()
  }
  