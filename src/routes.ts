import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateClienteController } from "./controllers/CreateClienteController";

const router = Router();

const createUser = new CreateUserController();
const createClientes = new CreateClienteController();

//Usuarios
router.post("/user", createUser.handle);
router.get("/users", createUser.index);
router.put('/users/:id', createUser.update);
router.delete('/users/:id', createUser.delete);
router.post('/usersfilter', createUser.getUserByAll);

//clientes
router.post("/clientenew", createClientes.handle);
router.put('/cliente/:id', createClientes.update);
router.delete('/cliente/:id', createClientes.delete);
router.post('/clientefilter', createClientes.getUserByAll);

//contatos
router.post("/newcontatos", createClientes.addContatos);
router.delete('/delcontatos/', createClientes.delContatos);



export { router };