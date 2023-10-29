
//Mis métodos del Application Layer

import { showTodoAdapter } from "../../../src/backend/todoListHexagonal/adapters/showTodoAdapter";
import { deleteTodoAdapter } from "../../../src/backend/todoListHexagonal/adapters/deleteTodoAdapter";
import { addTodoAdapter } from "../../../src/backend/todoListHexagonal/adapters/addTodoAdapter";
import { updateTodoAdapter } from "../../../src/backend/todoListHexagonal/adapters/updateTodoAdapter";

// El middleware Authenticate User
import { authenticateUser } from "../../../src/user/applicationLayer/authenticateUser";
import { createUser } from "../../../src/user/applicationLayer/createUser";
//Dependencias externas

import supertest from 'supertest';
import express from 'express';
import { json, urlencoded } from "body-parser";
import cors from "cors";
import helmet from "helmet";

//************//


//Testeando la Application Layer

describe("ApplicationLayer Tests", () => {

    const app = express();
app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

        test("Sin registrar usario, todos los ROUTES deberían dar 401", async () => {
		
            app.get('/', authenticateUser, showTodoAdapter)
              
              await supertest(app)
                .get('/')
                .send({"username": "papolito"})
                .expect(401)

                app.post('/', authenticateUser, addTodoAdapter)
              
                await supertest(app)
                  .post('/')
                  .send({"username": "papolito","task": "parranda","completado": false})
                  .expect(401)

                  app.put('/', authenticateUser, updateTodoAdapter)
              
                  await supertest(app)
                    .put('/')
                    .send({"username": "papolito","task": "parranda"})
                    .expect(401)

                    app.delete('/', authenticateUser, deleteTodoAdapter)
              
                await supertest(app)
                  .delete('/')
                  .send({"username": "papolito","task": "parranda"})
                  .expect(401)
            
                
        });

        test("Al registrar usuario, todas las ROUTES deberían dar 200", async () => {

          //Creamos usuario

            app.post('/register',createUser)

            await supertest(app)
            .post('/register')
            .send({"username": "papolito"})
            .expect(200)

            //Routes test
          
            app.get('/', authenticateUser, showTodoAdapter)
              
            await supertest(app)
              .get('/')
              .send({"username": "papolito"})
              .expect(200)

              app.post('/', authenticateUser, addTodoAdapter)
            
              await supertest(app)
                .post('/')
                .send({"username": "papolito","task": "parranda","completado": false})
                .expect(200)

                app.put('/', authenticateUser, updateTodoAdapter)
            
                await supertest(app)
                  .put('/')
                  .send({"username": "papolito","task": "parranda"})
                  .expect(200)

                  app.delete('/', authenticateUser, deleteTodoAdapter)
            
              await supertest(app)
                .delete('/')
                .send({"username": "papolito","task": "parranda"})
                .expect(200)

                //Este DELETE ha borrado todas las tareas. Ahora el toDo list está vacío
            
        });



        test("Antes de hacer POST, GET nos avisa de que está vacío el toDo list", async () => {
          app.get('/', authenticateUser, showTodoAdapter)

           let response = await supertest(app).get('/').send({"username": "papolito"})
        
           expect(response.text).toEqual("La toDo list está vacía");

        });

        test("Ahora, hacemos POST de alguna tarea, y el toDo list estará lleno", async ()=>{

          app.post('/', authenticateUser, addTodoAdapter)
            
          await supertest(app)
            .post('/')
            .send({"username": "papolito","task": "hacer la colada","completado": false})
            .expect(200)

            //Podemos añadir más de una tarea

            app.post('/', authenticateUser, addTodoAdapter)
            
            await supertest(app)
              .post('/')
              .send({"username": "papolito","task": "comprar la cena","completado": false})
              .expect(200)
            
            app.get('/', authenticateUser, addTodoAdapter)

            let response = await supertest(app)
            .get("/")
            .send({"username": "papolito"})
        
          expect(JSON.parse(response.text)).toEqual([{"task":"hacer la colada","completado":false},{"task":"comprar la cena","completado":false}]);

        })

        test("Si hacemos POST de lo mismo dos veces, no lo aceptará.", async()=>{

          app.post('/', authenticateUser, addTodoAdapter)
            
          let response = await supertest(app)
            .post('/')
            .send({"username": "papolito","task": "hacer la colada","completado": false})
            .expect(200)

        
          expect(response.text).toEqual("Esta tarea ya existe en la lista");

        })

        test("Si hacemos PUT, pasará a estar COMPLETADA la tarea",async ()=>{
          
          app.put('/', authenticateUser, addTodoAdapter)
            
          let response = await supertest(app)
            .put('/')
            .send({"username": "papolito","task": "hacer la colada"})
            .expect(200)

        //Ahora "hacer la colada" está TRUE completado
          expect(JSON.parse(response.text)).toEqual([{"task":"hacer la colada","completado":true},{"task":"comprar la cena","completado":false}]);

        })

        test("Si hacemos PUT sobre la misma tarea, no lo aceptará",async ()=>{

          app.put('/', authenticateUser, addTodoAdapter)
            
          let response = await supertest(app)
            .put('/')
            .send({"username": "papolito","task": "hacer la colada"})
            .expect(200)

        
          expect(response.text).toEqual("Esta tarea ya está completada, por favor elija otra");
          
        })
    
        test("usamos DELETE para eliminar una tarea",async()=>{
          app.delete('/', authenticateUser, addTodoAdapter)
            
          let response = await supertest(app)
            .delete('/')
            .send({"username": "papolito","task": "hacer la colada"})
            .expect(200)

        
          expect(response.text).toEqual("Se ha eliminado la tarea: hacer la colada.");

        })


        test("Si hacemos PUT sobre una tarea que no existe, nos lo dirá",async ()=>{

          app.put('/', authenticateUser, addTodoAdapter)
            
          let response = await supertest(app)
            .put('/')
            .send({"username": "papolito","task": "hacer la colada"})
            .expect(200)
        // "Hacer la colada" ya no existe
        
          expect(response.text).toEqual("Esta tarea no existe");
          
        })

        test("Si hacemos DELETE de una tarea que no existe, nos avisará", async()=>{

          app.delete('/', authenticateUser, addTodoAdapter)
            
          let response = await supertest(app)
            .delete('/')
            .send({"username": "papolito","task": "hacer la colada"})
            .expect(200)

        
          expect(response.text).toEqual("Esta tarea no existe");

        })

        test("Si hacemos DELETE de todas las tareas, nos dirá que la lista está vacía",async()=>{
          app.delete('/', authenticateUser, addTodoAdapter)
            
          await supertest(app)
            .delete('/')
            .send({"username": "papolito","task": "comprar la cena"})
            .expect(200)

            app.delete('/', authenticateUser, addTodoAdapter)
            
          let response = await supertest(app)
            .delete('/')
            .send({"username": "papolito","task": "comprar la cena"})
            .expect(200)

        
          expect(response.text).toEqual("No existe ninguna tarea por eliminar");

        })

        test("si intentamos hacer PUT cuando está vacía la lista, nos lo dice",async()=>{

          app.put('/', authenticateUser, addTodoAdapter)
            
          let response = await supertest(app)
            .put('/')
            .send({"username": "papolito","task": "comprar la cena"})
            .expect(200)
       
        
          expect(response.text).toEqual("No existe ninguna tarea en la toDo list");

          
        })
    





        


	
});
