import { showTodoPort } from "../businessLogicHexagon/ports/showTodoPort";
import { Request, Response } from "express";


export const showTodoAdapter = (req: Request, res: Response) =>{
 

    let resultado = showTodoPort();

    res.end(resultado);

}