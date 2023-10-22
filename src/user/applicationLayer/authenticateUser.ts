
import {arrayUsers} from '../domain/entities/ArrayUsers'
import User from '../domain/entities/User';

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
    status: Function;
  }

export const authenticateUser =  (req: requestInterface, res: responseInterface, next: Function) => {
    

    let i = 0;
    let salirDelLoop = false;

    if (arrayUsers.length > 0){
        while (salirDelLoop === false && i < arrayUsers.length){

            
            if (arrayUsers[i]["name"] === req.body.username){
                salirDelLoop = true; 

                next()
            }
            i++;
        }

        if (salirDelLoop === false){
            res.status(401).end("El usuario "+req.body.username+" no existe")
        }
       
    }else{
        res.status(401).end("No hay usuarios")
    }

    

    
    
}

  

    
