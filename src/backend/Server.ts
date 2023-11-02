import { json, urlencoded } from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import { authenticateUserAdapter } from "../user/applicationLayer/authenticateUserAdapter";
//****//
// Mis métodos de gestión de usuarios del Application Layer del usuario:
//****//
import { createUserAdapter } from "../user/applicationLayer/createUserAdapter";
//Mis métodos toDo del Application Layer del toDo:
//****//
import { addTodoAdapter } from "./todoListHexagonal/adapters/addTodoAdapter";
import { deleteTodoAdapter } from "./todoListHexagonal/adapters/deleteTodoAdapter";
import { showTodoAdapter } from "./todoListHexagonal/adapters/showTodoAdapter";
import { updateTodoAdapter } from "./todoListHexagonal/adapters/updateTodoAdapter";
//****//

export class Server {
	private readonly express: express.Express;
	private readonly port: string;

	constructor(port: string) {
		this.port = port;
		this.express = express();
		this.express.use(helmet());
		this.express.use(cors());
		this.express.use(json());
		this.express.use(urlencoded({ extended: true }));
	}

	ejecutarHexagono(): void {
		this.express.post("/register", createUserAdapter);

		this.express.get("/:username", authenticateUserAdapter, showTodoAdapter);
		this.express.post("/:username", authenticateUserAdapter, addTodoAdapter);
		this.express.put("/:username", authenticateUserAdapter, updateTodoAdapter);
		this.express.delete("/:username", authenticateUserAdapter, deleteTodoAdapter);
	}

	async listen(): Promise<void> {
		await new Promise<void>((resolve) => {
			this.express.listen(this.port, () => {
				// eslint-disable-next-line no-console
				console.log(
					`✅ Backend App is running at http://localhost:${this.port} in ${this.express.get(
						"env"
					)} mode`
				);
				// eslint-disable-next-line no-console
				console.log("✋ Press CTRL-C to stop\n");

				resolve();
			});
		});
	}
}
