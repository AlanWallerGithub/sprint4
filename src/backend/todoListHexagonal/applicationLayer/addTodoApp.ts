import {todoList} from '../domainLayer/toDo';

export const addTodoApp = (req, res) => {
    todoList.push(req.body);
    res.send(todoList)
    res.end()}