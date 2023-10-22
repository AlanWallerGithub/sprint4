import {todoList} from '../domainLayer/toDo';

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

export const updateTodoApp = (req: requestInterface, res: responseInterface) => {

  if (todoList.length > 0){
    let salirDelLoop = false;

    let i = 0;

    while (salirDelLoop === false){
      if (todoList[i].task === req.body.task){
        if (todoList[i].completado === false){
           todoList[i].completado = true;
           salirDelLoop = true;
           res.end(`${JSON.stringify(todoList, undefined, 5)}`)
        }else{
          salirDelLoop = true;
          res.end("Esta tarea ya está completada, por favor elija otra")
        }
        
        
      }else if (i === todoList.length -1){
        salirDelLoop = true;
        res.end("Esta tarea no existe")
      }
      i++;
    }
  }else{
    // Si no existe ninguna tarea en la toDo list

    res.end("No existe ninguna tarea en la toDo list")
  }
   
    

  }