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

export const deleteTodoApp = (req: requestInterface, res: responseInterface) => {

  if (todoList.length > 0){
    let salirDelLoop = false;

    let i = 0;

    while (salirDelLoop === false){
      
      if (todoList[i].task === req.body.task){
        
        
        salirDelLoop = true;
        res.send(`Se ha eliminado la tarea: ${todoList[i].task}.`) 
        todoList.splice(i,1);
        res.end()
        
        
      }else if ((todoList[i].task !== req.body.task)|| i === todoList.length -1){
        salirDelLoop = true;
        res.end("Esta tarea no existe")
      }
      
      i++;
    }
  }else{
    // En caso de que el toDo no exista (se ha eliminado por completo)

    res.end("No existe ninguna tarea por eliminar")
  }

  }