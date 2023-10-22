import User from '../domain/entities/User'
import {arrayUsers} from '../domain/entities/ArrayUsers'

type bodyType = {
    username: string,
    task: string,
    completado: boolean
  }
  
  interface requestInterface {
    body: bodyType;
  }
  
  
  interface responseInterface {
    send: Function;
    end:Function;
  }



export const createUser = (req: requestInterface, res: responseInterface) => {
    let nuevoUsuario = new User(req.body.username);
    arrayUsers.push(nuevoUsuario);
    res.send("User created: "+JSON.stringify(arrayUsers))
    res.end()}