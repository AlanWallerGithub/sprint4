import { Request, Response } from "express";

import { createUser } from "./createUser";

export const createUserAdapter = (req: Request, res: Response): void => {
	const username: string = req.body.username;

	const resultado = createUser(username);

	res.end(resultado);
};
