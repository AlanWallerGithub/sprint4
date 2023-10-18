import {todoList} from '../domainLayer/toDo';

export const updateTodoApp = (req, res) => {
   
    let salirDelLoop = false;

    let i = 0;

    while (salirDelLoop === false){
      if (todoList[i].task === req.body.task){
        if (todoList[i].completado === false){
           todoList[i].completado = true;
           salirDelLoop = true;
           res.end(`Se ha marcado la tarea ${todoList[i].task} como completada. Aquí está la lista entera de tareas: ${JSON.stringify(todoList, undefined, 5)}`)
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

  }