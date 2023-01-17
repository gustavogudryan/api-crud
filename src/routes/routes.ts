import { Router, Request, Response} from 'express';
import { notes, users } from '../data/data';
import { Note, User } from '../models';

const router = Router()

router.post("/users", (req: Request, res: Response)=>{
    const {username, email, password, repassword} = req.body

    if(!username || !email || !password || !repassword){
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
        const user = new User(username, email, password)

        users.push(user)

        return res.status(200).json({
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

router.post("/users/notes", (req: Request, res: Response) => {
    const { userEmail, title, description } = req.body;
  
    const existUser = users.some((user) => user.email === userEmail);
  
    if (!existUser) {
      return res.status(418).json({
        success: false,
        message: "Sem recados!",
      });
    } else {
        const note = new Note(userEmail, title, description)

        notes.push(note)

        return res.status(200).json({
            sucess: true,
            data: note,
        })
    }
  });

  router.get("/users/notes", (req: Request, res: Response) => {
    const { userEmail } = req.query;
  
    const existUser = users.some((user) => user.email === userEmail);
    if (!existUser) {
      return res.status(418).json({
        success: false,
        message: "Usuário não encontrado",
      });
    } else {
      const userNotes = notes.filter((note) => note.userEmail === userEmail);

      return res.status(200).json({
        success: true,
        data: userNotes,
      });
    }
  });

  router.put("/users/notes/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description } = req.body;
  
    const indexNote = notes.findIndex((note) => note.id == id);

    if (indexNote == -1) {
      return res.status(418).json({
        success: false,
        message: "Recado não encontrado!",
      });
    } else {

      notes[indexNote].title = title;
      notes[indexNote].description = description;

      return res.status(200).json({
        success: true,
        data: notes[indexNote],
      });
    }
  });

  router.delete("/users/notes/:id", (req: Request, res: Response) => {
    const { id } = req.params;
  
    const note = notes.find((note) => note.id == id);

    if (!note) {
      return res.status(418).json({
        success: false,
        message: "Recado não encontrado!",
      });
    } else {
      const noteIndex = notes.findIndex((f) => f == note);

      notes.splice(noteIndex, 1);

      return res.status(200).json({
        success: true,
        data: notes,
        message: "Recado deletado!",
      });
    }
  });


export default router