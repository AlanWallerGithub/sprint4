import { Request, Response } from "express";

import { addTodoPort } from "../businessLogicHexagon/ports/addTodoPort";

export const addTodoAdapter = (req: Request, res: Response): void => {
	const task: string = req.body.task;
	const completado: boolean = req.body.completado;

	const resultado = addTodoPort(task, completado);

	res.end(resultado);
};
