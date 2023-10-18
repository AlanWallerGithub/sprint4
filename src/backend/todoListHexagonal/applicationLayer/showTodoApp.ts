import {todoList} from '../domainLayer/toDo';

export const showTodoApp = (req, res) => {
    res.status(200).send(todoList);
  }