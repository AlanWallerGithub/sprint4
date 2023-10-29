import { todoList } from "../domain/toDo";

export const deleteTodoPort = (taskArgumento: string): string | undefined => {
	if (todoList.length > 0) {
		let salirDelLoop = false;

		let i = 0;

		while (!salirDelLoop) {
			if (todoList[i].task === taskArgumento) {
				salirDelLoop = true;
				const mensajeDeEliminar = `Se ha eliminado la tarea: ${todoList[i].task}.`;
				todoList.splice(i, 1);

				return mensajeDeEliminar;
			}
			if (todoList[i].task !== taskArgumento || i === todoList.length - 1) {
				salirDelLoop = true;

				return "Esta tarea no existe";
			}

			i++;
		}
	} else {
		return "No existe ninguna tarea por eliminar";
	}
};
