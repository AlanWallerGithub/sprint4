import { Request, Response } from "express";

import { updateTodoPort } from "../businessLogicHexagon/ports/updateTodoPort";

export const updateTodoAdapter = (req: Request, res: Response): void => {
	const task: string = req.body.task;

	const resultado = updateTodoPort(task);

	res.end(resultado);
};
