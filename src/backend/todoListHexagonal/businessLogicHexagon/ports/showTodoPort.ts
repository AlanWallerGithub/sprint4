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
export const showTodoPort = (): string => {
	if (todoList.length > 0) {
		return JSON.stringify(todoList, undefined, 5);
	} else {
		return "La toDo list está vacía";
	}
};
