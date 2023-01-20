import { Router, Request, Response} from 'express';
import { recados, users } from '../data/data';
import { Recado, User } from '../models';

const router = Router()

router.post("/users", (req: Request, res: Response)=>{
    const {name, email, password, repassword} = req.body

    if(!name || !email || !password || !repassword){
        return res.status(400).json({
            sucess: false,
            message: "Preencha todos os campos",
        });
    }else {
        if(password !== repassword){
            return res.status(401).json({
                sucess: false,
                message: "Senhas diferentes",
        });
    } else {
        const existEmail = users.some((user) => user.email === email)
        if(existEmail){
            return res.status(409).json({
                sucess: false,
                message: "Email em uso!",
            })
        }
        const user = new User(name, email, password, repassword)

        users.push(user)

        return res.status(200).json({
            message: "Conta criada com sucesso!",
            sucess: true,
            data: user,
        })
    }  
} 
}) 

router.post("/users/login", (req: Request, res: Response) =>{
    const { email, password} = req.body

    const existUser = users.some((user) => user.email === email && user.password === password)

    if(existUser){
        return res.status(201).json({
            sucess: true,
        })
    } else {
        return res.status(404).json({
            sucess: false,
            message: "Email ou senha incorretas!"
        })
    }
})

router.post("/users/recados", (req: Request, res: Response) => {
    const { userEmail, titulo, descricao } = req.body;
  
    const existUser = users.some((user) => user.email === userEmail);
  
    if (!existUser) {
      return res.status(418).json({
        success: false,
        message: "Sem recados!",
      });
    } else if(!titulo || !descricao){
      return res.status(401).json({
        success: false,
        message: "Informe os campos!",
      });
    } else {
        const recado = new Recado(userEmail, titulo, descricao)

        recados.push(recado)

        return res.status(200).json({
            sucess: true,
            data: recado,
        })
    }
  });

  router.get("/users", (req: Request, res: Response) =>{
      const listaUsuarios = users.map((user)=>{
          return {
            name: user.name,
            email: user.email,
            password: user.password,
          }
      });
      res.status(200).json(listaUsuarios)
  })

  router.get("/users/recados", (req: Request, res: Response) => {
    const { userEmail} = req.query;
  
    const existUser = users.some((user) => user.email === userEmail);

    if (!existUser) {
      return res.status(418).json({
        success: false,
        message: "Usuário não encontrado",
      });
    } else {
      const userRecados = recados.filter((recado) => recado.userEmail === userEmail);

      return res.status(200).json({
        success: true,
        data: userRecados,
      });
    }
  });

  router.put("/users/recados/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const { titulo, descricao } = req.body;
  
    const indexNote = recados.findIndex((recado) => recado.id === id);

    if (indexNote == -1) {
      return res.status(418).json({
        success: false,
        message: "Recado não encontrado!",
      });
    } else {

      recados[indexNote].titulo = titulo;
      recados[indexNote].descricao = descricao;

      return res.status(200).json({
        success: true,
        data: recados[indexNote],
      });
    }
  });

  router.delete("/users/recados/:id", (req: Request, res: Response) => {
    const { id } = req.params;
  
    const note = recados.find((recado) => recado.id === id);

    if (!note) {
      return res.status(418).json({
        success: false,
        message: "Recado não encontrado!",
      });
    } else {
      
      const noteIndex = recados.findIndex((f) => f == note);

      recados.splice(noteIndex, 1);

      return res.status(200).json({
        success: true,
        data: recados,
        message: "Recado deletado!",
      });
    }
  });


export default router