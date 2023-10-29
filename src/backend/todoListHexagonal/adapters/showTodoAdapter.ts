import { Request, Response } from "express";

import { showTodoPort } from "../businessLogicHexagon/ports/showTodoPort";

export const showTodoAdapter = (req: Request, res: Response): void => {
	const resultado = showTodoPort();

	res.end(resultado);
};
