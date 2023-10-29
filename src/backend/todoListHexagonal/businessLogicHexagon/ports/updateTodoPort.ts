import { todoList } from "../domain/toDo";

export const updateTodoPort = (taskArgumento: string): string | undefined => {
	if (todoList.length > 0) {
		let salirDelLoop = false;

		let i = 0;

		while (!salirDelLoop) {
			if (todoList[i].task === taskArgumento) {
				if (!todoList[i].completado) {
					todoList[i].completado = true;
					salirDelLoop = true;

					return `${JSON.stringify(todoList, undefined, 5)}`;
				}
				salirDelLoop = true;

				return "Esta tarea ya está completada, por favor elija otra";
			}
			if (i === todoList.length - 1) {
				salirDelLoop = true;

				return "Esta tarea no existe";
			}
			i++;
		}
	} else {
		return "No existe ninguna tarea en la toDo list";
	}
};
