import express from 'express';
import cors from 'cors';
import router from './routes/routes';

const server = express ()

const port = process.env.PORT || 3001

server.use(express.json(), cors(), router)

server.listen(port, () => console.log("Server Working!"));
