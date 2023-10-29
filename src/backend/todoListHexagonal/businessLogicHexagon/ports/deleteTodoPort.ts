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

export const deleteTodoPort = (taskArgumento: string): string | undefined => {
	if (todoList.length > 0) {
		let salirDelLoop = false;

		let i = 0;

		while (!salirDelLoop) {
			if (todoList[i].task === taskArgumento) {
				salirDelLoop = true;
				let mensajeDeEliminar = `Se ha eliminado la tarea: ${todoList[i].task}.`;
				todoList.splice(i, 1);
				return mensajeDeEliminar;
			} else if (todoList[i].task !== taskArgumento || i === todoList.length - 1) {
				salirDelLoop = true;
				return "Esta tarea no existe";
			}

			i++;
		}
	} else {

		return "No existe ninguna tarea por eliminar";
	}
};
