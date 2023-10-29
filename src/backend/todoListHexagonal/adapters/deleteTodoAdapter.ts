import { deleteTodoPort } from "../businessLogicHexagon/ports/deleteTodoPort";
import { Request, Response } from "express";


export const deleteTodoAdapter = (req: Request, res: Response) =>{

    let task = req.body.task;
 

    let resultado = deleteTodoPort(task);

    res.end(resultado);

}