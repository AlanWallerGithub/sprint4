import { Request, Response } from "express";

import { deleteTodoPort } from "../businessLogicHexagon/ports/deleteTodoPort";

export const deleteTodoAdapter = (req: Request, res: Response): void => {
	const task: string = req.body.task;

	const resultado = deleteTodoPort(task);

	res.end(resultado);
};
