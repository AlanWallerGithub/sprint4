import { addTodoPort } from "../businessLogicHexagon/ports/addTodoPort";
import { Request, Response } from "express";


export const addTodoAdapter = (req: Request, res: Response) =>{

    let task = req.body.task;
    let completado = req.body.completado;

    let resultado = addTodoPort(task,completado);

    res.end(resultado);

}
