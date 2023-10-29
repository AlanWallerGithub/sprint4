import { arrayUsers } from "../domain/entities/ArrayUsers";
import User from "../domain/entities/User";

export const createUser = (username: string): string => {
	const nuevoUsuario = new User(username);
	arrayUsers.push(nuevoUsuario);

	return `User created: ${JSON.stringify(arrayUsers)}`;
};
