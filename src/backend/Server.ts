import { json, urlencoded } from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";

//Mis métodos toDo del Application Layer:


//****//
import {addTodoApp} from './todoListHexagonal/applicationLayer/addTodoApp'
import {deleteTodoApp} from './todoListHexagonal/applicationLayer/deleteTodoApp'
import {updateTodoApp} from './todoListHexagonal/applicationLayer/updateTodoApp'
import {showTodoApp} from './todoListHexagonal/applicationLayer/showTodoApp'
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

	ejecutarHexagono(){
		this.express.get('/', showTodoApp);
		this.express.post('/', addTodoApp);
		this.express.put('/', updateTodoApp);
		this.express.delete('/', deleteTodoApp);

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
