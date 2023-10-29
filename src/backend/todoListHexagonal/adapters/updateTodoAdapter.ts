import { updateTodoPort } from "../businessLogicHexagon/ports/updateTodoPort";
import { Request, Response } from "express";


export const updateTodoAdapter = (req: Request, res: Response) =>{

    let task = req.body.task;

    let resultado = updateTodoPort(task);

    res.end(resultado);

}
