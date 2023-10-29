# Sprint 4 - Segunda entrega

En este Sprint he usado NODE.JS v20.8.0.

Esta es la segunda entrega. He creado una estructura de puertos y adaptadores para separar las dependencias de Express del business logic, que en la primera entrega no estaba separado.


He aplicado la arquitectura hexagonal a mi toDo list en la carpeta *"./src/backend/todoListHexagonal"*.

Este ToDo consiste de tres capas, el hexágono en sí es la business logic del ToDo. Incluye la entidad "ToDo" que recoge todas las tareas en un array de objetos.

La segunda capa está dentro del hexágono en sí. Son los ports, una serie de descripciones del CRUD del ToDo, en términos desanclados de dependencias externas. Ellos se basan en la entidad del hexágono para realizar sus tareas, pero no en Express, etc.

La tercera capa son los adapters. Son funciones CRUD pero esta vez añaden dependencias externas a los ports. En mi caso, Express.js.

---

La zona "user" también contiene ports de autenticación y creación de usuarios. Además, adapters que implementan Express en estos.


Tras crear estos adapters tanto de backend como de user, los he importado en el archivo Server. Allí, en el server, he añadido un método , "ejecutarHexagono()":

```ts
ejecutarHexagono(): void {
		this.express.post("/register", createUserAdapter);

		this.express.get("/", authenticateUserAdapter, showTodoAdapter);
		this.express.post("/", authenticateUserAdapter, addTodoAdapter);
		this.express.put("/", authenticateUserAdapter, updateTodoAdapter);
		this.express.delete("/", authenticateUserAdapter, deleteTodoAdapter);
	}
```

A cada ROUTE le paso el middleware de "authenticateUserAdapter". Si este ha sido creado con "createUserAdapter" (mi primer método POST en el código de arriba), entonces pasa a la función en sí. Para cada caso, es "showTodoAppAdapter", "addTodoAppAdapter", y todas las funciones que he creado en la capa de adapters del hexágono.

---

## Nivel 1:

El archivo de POSTMAN para testear el API es *“Sprint 4 POSTMAN collection.postman_collection.json”*, y se encuentra en el ROOT del repositorio.

En él, los endpoints se testean así:

### POST para registrar usuario:

Este POST se llama al endpoint “/register” de la dirección, en este caso “localhost:8000”. El body debe contener un nombre de usuario, en formato JSON, en este caso he escogido {"username": "papolito"}.

### GET:

GET se llama directamente al root de la dirección, en este caso “localhost:8000”. El body del GET debe contener el nombre de usuario que se haya registrado, en formato JSON, en este caso {"username": "papolito"}.

### POST:

POST se llama directamente al root de la dirección, en este caso “localhost:8000”. El body del POST debe contener el nombre de usuario que se haya registrado, la tarea a añadir, y su estado de completado, en formato JSON, en este caso {"username": "papolito","task": "limpiar la casa","completado": false}.

### PUT:

PUT se usa para modificar el estado de completado. Se llama directamente al root de la dirección, en este caso “localhost:8000”. El body del PUT debe contener el nombre de usuario que se haya registrado y la tarea a completar, en formato JSON, en este caso {"username": "papolito","task": "limpiar la casa" }.

### DELETE:

DELETE se llama directamente al root de la dirección, en este caso “localhost:8000”. El body del DELETE debe contener el nombre de usuario que se haya registrado y la tarea a eliminar, en formato JSON, en este caso {"username": "papolito","task": "limpiar la casa" }.

****************

Todos estos endpoints reaccionan al hecho de no tener usuario registrado, o al hecho de intentar modificar la misma tarea dos veces, o al hecho de intentar consultar la toDo list cuando esta está vacía. Se avisa al usuario con un mensaje para cada uno.

---

## Nivel 2:

Usando los developer tools de tu navegador, en mi caso Chrome, puedo ver que mi API tiene los headers necesarios para Cache Control No Cache:

![screenshot 13](https://github.com/AlanWallerGithub/sprint4/assets/140154835/dc3b779c-ef48-473b-9bfe-1aedc6fbf588)

Y también para CORS:

![screenshot 14](https://github.com/AlanWallerGithub/sprint4/assets/140154835/f40fbafd-1ab6-4d83-b9aa-aecff1bf47dc)

En esta misma captura se ve que también respondo con Status 401 - Unauthorized al hecho de que no haya registrado usuario para mi API

---

## Nivel 3:

Usando Jest y Supertest, he creado tests para los adapters de mi toDo. Para realizar estos tests ya he tenido que usar mis funciones de creación y autorización de usuarios, por lo que no he creado tests específicos para ellas.

Tampoco he testeado la entidad "todoList", ya que esta queda testeada a través de los tests.


