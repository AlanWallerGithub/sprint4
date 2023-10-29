import { arrayUsers } from "../domain/entities/ArrayUsers";

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
// 	status: Function;
// }

export const authenticateUser = (username: string): string | undefined => {
	let i = 0;
	let salirDelLoop = false;

	if (arrayUsers.length > 0) {
		while (!salirDelLoop && i < arrayUsers.length) {
			if (arrayUsers[i]["name"] === username) {
				salirDelLoop = true;

				return "next";
			}
			i++;
		}

		if (!salirDelLoop) {
			return `El usuario ${username} no existe`;
		}
	} else {
		return "No hay usuarios";
	}
};
