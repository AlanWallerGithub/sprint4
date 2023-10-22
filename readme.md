##Sprint 4

En este Sprint he usado NODE.JS v20.8.0.

He aplicado la arquitectura hexagonal a mi toDo list en la carpeta "./src/backend/todoListHexagonal".

He encontrado varios problemas. Como lo he entenidod, el Interface Layer debería contener las llamadas a servicios externos, como Express.js, pero Express.js ya se llama en el Server. Por lo tanto, me he centrado en crear el Application Layer, con las llamadas GET, POST, PUT, etc, a mi toDo list. Como no he usado bases de datos, mi Domain Layer es solamente un array en el que meter la información. Por eso, no tengo claro si esto cuenta como arquitectura hexagonal.

Otro problema era que no he conseguido usar el tipo "object" para definir funciones que llamen a partes de Express, como send, end, o status, etc. Incluso usando un "if statement" para verificar el tipo, me daba el aviso de que:

error TS2349: This expression is not callable. Type '{}' has no call signatures.

He usado el tipo "Function", y así me ha funcionado. Al linter no le ha aceptado, así que he desactivado el lint desde Github Actions. Buscando en Github issues, he visto otros errores que parecían como el mío. Adjunto por si puede ser útil:

https://github.com/strapi/strapi/issues/16993

#Nivel 1:

El archivo de POSTMAN para testear el API es “Sprint 4 POSTMAN collection.postman_collection.json”, y se encuentra en el ROOT del repositorio.

En él, los endpoints se testean así:

POST para registrar usuario:

Este POST se llama al endpoint “/register” de la dirección, en este caso “localhost:8000”. El body debe contener un nombre de usuario, en formato JSON, en este caso he escogido {"username": "papolito"}.

GET:

GET se llama directamente al root de la dirección, en este caso “localhost:8000”. El body del GET debe contener el nombre de usuario que se haya registrado, en formato JSON, en este caso {"username": "papolito"}.

POST:

POST se llama directamente al root de la dirección, en este caso “localhost:8000”. El body del POST debe contener el nombre de usuario que se haya registrado, la tarea a añadir, y su estado de completado, en formato JSON, en este caso {"username": "papolito","task": "limpiar la casa","completado": false}.

PUT:

PUT se usa para modificar el estado de completado. Se llama directamente al root de la dirección, en este caso “localhost:8000”. El body del PUT debe contener el nombre de usuario que se haya registrado y la tarea a completar, en formato JSON, en este caso {"username": "papolito","task": "limpiar la casa" }.

DELETE:

DELETE se llama directamente al root de la dirección, en este caso “localhost:8000”. El body del DELETE debe contener el nombre de usuario que se haya registrado y la tarea a eliminar, en formato JSON, en este caso {"username": "papolito","task": "limpiar la casa" }.

---

Todos estos endpoints reaccionan al hecho de no tener usuario registrado, o al hecho de intentar modificar la misma tarea dos veces, o al hecho de intentar consultar la toDo list cuando esta está vacía. Se avisa al usuario con un mensaje para cada uno.


#Nivel 2:

Usando los developer tools de tu navegador, en mi caso Chrome, puedo ver que mi API tiene los headers necesarios para Cache Control No Cache:

![screenshot 13](https://github.com/AlanWallerGithub/sprint4/assets/140154835/dc3b779c-ef48-473b-9bfe-1aedc6fbf588)

Y también para CORS:

![screenshot 14](https://github.com/AlanWallerGithub/sprint4/assets/140154835/f40fbafd-1ab6-4d83-b9aa-aecff1bf47dc)

En esta misma captura se ve que también respondo con Status 401 - Unauthorized al hecho de que no haya registrado usuario para mi API


#Nivel 3:

Usando Jest y Supertest, he creado tests para la Application Layer de mi toDo. Para relizar estos tests ya he tenido que usar mis funciones de creación y autorización de usuarios, por lo que no he creado tests específicos para ellas, quedan comprobadas en los tests del Application.

Tampoco he testeado el Domain Layer, ya que este también queda testeado a través de los tests.


