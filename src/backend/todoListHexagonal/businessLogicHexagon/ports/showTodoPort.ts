import { todoList } from "../domain/toDo";

export const showTodoPort = (): string => {
	if (todoList.length > 0) {
		return JSON.stringify(todoList, undefined, 5);
	}

	return "La toDo list está vacía";
};
