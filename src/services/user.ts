import { Request, Response } from "express";
import { ILoggedUser, IMessage, IResponse, IUser} from "../interfaces";
import { userlist } from "../data/user.data";
import { v4 as uuidv4 } from 'uuid';

class User {
    getUsers(req: Request, res: Response) {
        res.json({
            sucess: true,
            data: userlist,
        } as IResponse)
    }

    getUserID(req: Request, res: Response) {
        const { id } = req.params;
        const user = userlist.find((f) => f.id === id);

        if(!user){
            return res.status(422).json({
                sucess: false,
                message: "Id não encontrado",
                data: null,
              } as IResponse); 
        }
    
        return res.status(200).json({
          sucess: true,
          data: user,
        } as IResponse);
      }

    createUser(req: Request, res: Response) {
        const {name, email, password, repassword} = req.body

        const newUser = {
            id: uuidv4(),
            name,
            email,
            password,
        } as IUser;

        userlist.push(newUser)

        if(password !== repassword){
            res.status(422).json({
                sucess: false,
                message: "As senhas não conferem"
            })
        }

        res.status(201).json({
            sucess: true,
            data: newUser,
        } as IResponse)
    }

    authenticateUser(user: IUser): IResponse {
        if(!user.name){
            return {
                sucess: false,
                message: "Nome é obrigatorio",
                data: null,
            };
        }
        if(!user.email){
            return {
                sucess: false,
                message: "Email é obrigatorio",
                data: null,
            };
        }
        if(!user.password){
            return {
                sucess: false,
                message: "Senha é obrigatorio",
                data: null,
            };
        }
        return {
            sucess: true,
            data: null,
        }
    }

    loginUser(req: Request, res: Response){
        const {email, password} = req.body

        const loggedUser = userlist.find((user: IUser) => (user.email === email && user.password === password))

        const userOn = {
            id: loggedUser?.id,
            name: loggedUser?.name
        } as ILoggedUser

        res.status(201).json({
            sucess: true,
            message: "Entrou",
            data: userOn,
        } as IResponse)
    }

}

const user = new User()
export {user}