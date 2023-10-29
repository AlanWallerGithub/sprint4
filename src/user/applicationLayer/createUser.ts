import { arrayUsers } from "../domain/entities/ArrayUsers";
import User from "../domain/entities/User";

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

export const createUser = (username: string): string => {
	const nuevoUsuario = new User(username);
	arrayUsers.push(nuevoUsuario);

	return `User created: ${JSON.stringify(arrayUsers)}`;
};
