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
export const showTodoApp = (req: requestInterface, res: responseInterface): void => {
	if (todoList.length > 0) {
		res.end(JSON.stringify(todoList, undefined, 5));
	} else {
		res.end("La toDo list está vacía");
	}
};
