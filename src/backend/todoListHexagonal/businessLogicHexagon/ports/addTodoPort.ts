import { todoList } from "../domain/toDo";

// type bodyType = {
// 	username: string;
// 	task: string;
// 	completado: boolean;
// };

// interface requestInterface {
// 	body: bodyType;
// }

// interface responseInterface {
// 	send: Function;
// 	end: Function;
// }

export const addTodoPort = (
	taskArgumento: string,
	completadoArgumento: boolean
): string | undefined => {
	if (todoList.length > 0) {
		let salirDelLoop = false;

		let i = 0;

		while (!salirDelLoop && i < todoList.length) {
			if (todoList[i].task === taskArgumento) {
				salirDelLoop = true;

				return "Esta tarea ya existe en la lista";
			}
			if (i === todoList.length - 1) {
				salirDelLoop = true;
				const nuevoTodo = { task: taskArgumento, completado: completadoArgumento };

				todoList.push(nuevoTodo);

				return JSON.stringify(todoList, undefined, 5);
			}
			i++;
		}
	} else {
		//Por alguna razón, el método POST no le gusta que el array "toDo" esté vacío. En vez de considerarlo de "length 0", lo considera undefined. No sé cómo evitar que haga esto, así que he creado esta división entre "todoList.length > 0" y todo lo otro, aunque repito el código de creación de tasks dos veces

		const nuevoTodo = { task: taskArgumento, completado: completadoArgumento };

		todoList.push(nuevoTodo);

		return JSON.stringify(todoList, undefined, 5);
	}
};
