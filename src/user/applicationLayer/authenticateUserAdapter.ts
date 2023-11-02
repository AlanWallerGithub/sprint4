import { NextFunction, Request, Response } from "express";

import { authenticateUser } from "./authenticateUser";

export const authenticateUserAdapter = (req: Request, res: Response, next: NextFunction): void => {
	const username: string = req.params.username;

	const resultado = authenticateUser(username);

	if (resultado === "next") {
		next();
	} else {
		res.status(401).end(resultado);
	}
};
