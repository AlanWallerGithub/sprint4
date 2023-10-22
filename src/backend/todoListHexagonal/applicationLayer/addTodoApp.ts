import { todoList } from "../domainLayer/toDo";

type bodyType = {
	username: string;
	task: string;
	completado: boolean;
};

interface requestInterface {
	body: bodyType;
}

interface responseInterface {
	send: Function;
	end: Function;
}

export const addTodoApp = (req: requestInterface, res: responseInterface): void => {
	if (todoList.length > 0) {
		let salirDelLoop = false;

		let i = 0;

		while (!salirDelLoop && i < todoList.length) {
			if (todoList[i].task === req.body.task) {
				salirDelLoop = true;
				res.end("Esta tarea ya existe en la lista");
			} else if (i === todoList.length - 1) {
				salirDelLoop = true;
				const nuevoTodo = { task: req.body.task, completado: req.body.completado };

				todoList.push(nuevoTodo);
				res.end(JSON.stringify(todoList, undefined, 5));
			}
			i++;
		}
	} else {
		//Por alguna razón, el método POST no le gusta que el array "toDo" esté vacío. En vez de considerarlo de "length 0", lo considera undefined. No sé cómo evitar que haga esto, así que he creado esta división entre "todoList.length > 0" y todo lo otro, aunque repito el código de creación de tasks dos veces

		const nuevoTodo = { task: req.body.task, completado: req.body.completado };

		todoList.push(nuevoTodo);
		res.end(JSON.stringify(todoList, undefined, 5));
	}
};
