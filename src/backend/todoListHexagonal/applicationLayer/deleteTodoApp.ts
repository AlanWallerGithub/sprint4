import {todoList} from '../domainLayer/toDo';

export const deleteTodoApp = (req, res) => {
    let salirDelLoop = false;

    let i = 0;



    while (salirDelLoop === false){
      
      if (todoList[i].task && todoList[i].task === req.body.task){
        
        
        salirDelLoop = true;
        res.send(`Se ha eliminado la tarea ${todoList[i].task}.`) 
        todoList.splice(i,1);
      
      //  res.end(`Aquí está la lista entera de tareas: ${JSON.stringify(todoList, undefined, 5)}`)
      // res.end("heyy")
     
      
        
        
      }else if ((todoList[i].task && todoList[i].task !== req.body.task)|| i === todoList.length -1){
        salirDelLoop = true;
        res.end("Esta tarea no existe")
      }
      i++;
    }
  }