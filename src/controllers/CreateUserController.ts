import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Request, Response } from "express";
import { prismaClient} from "../database/prismaClient";

export class CreateUserController {
    async handle(request: Request, response: Response){
        const {name, email, password} = request.body;
    try {

        const isexite = await prismaClient.user.count({
           where: { email: String(email) }            
        });

        if (isexite != 0){
            return response.status(400).json({ error: 'Já existe um usuário com este E-mail!' });
        }

        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                password
            }
        })
        return response.json(user);
    } catch (error){
              return response.status(400).json({ error: 'Email já em uso' });
          }
    }

    async index(request: Request, response: Response){
        const user = await prismaClient.user.findMany();
        return response.json(user);
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { name, email, password } = request.body;
    
        try {
             const user = await prismaClient.user.update({
            where: { id: Number(id) },
            data: { name, email, password },
          });
          return response.json(user);
        } catch (error) {
          if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
            return response.status(404).json({ error: 'User not found' });
          } else {
            throw error;
          }
        }
      }
    
      async delete(request: Request, response: Response) {
        const { id } = request.params;
    
        try {
            const isexite = await prismaClient.user.count({
                where: { id: Number(id) }            
             });
             if (isexite == 0){
                 return response.status(400).json({ error: 'Usuário já foi excluido!' });
             }

          await prismaClient.user.delete({
            where: { id: Number(id) },
          });
          return response.status(204).send({confirm: 'Usuario excluido com sucesso'});
        } catch (error) {
          if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
            return response.status(404).json({ error: 'User not found' });
          } else {
            throw error;
          }
        }
      }
    
    async getUserByAll(request: Request, response: Response) {
        const { id, name, email } = request.body;
        
        //pesquisa só id
        if (id != "" && name == "" && email == ""){
        const user = await prismaClient.user.findUnique({ where: { id: Number(id) } });
        return response.json(user);
        }
    //pesquisa por nome  
    if (id == "" && name != "" && email == "") {
        const user = await prismaClient.user.findMany({ where: { name: {
            contains: String(name) } } });
        return response.json(user);
      }
    
    //pesquisar por nome e email
     if (id == "" && name != "" && email != "") {

        const user = await prismaClient.user.findMany({ where: { 
          name: {
            contains : String(name)
        },
            email: String(email)
        } });
        return response.json(user);
      }
    
      //pesquisar por email
      if (id == "" && name == "" && email != ""){
        const user = await prismaClient.user.findMany({ where: { email: String(email) } });
        return response.json(user);
      }
      //busca tudo
      if (id == "" && name == "" && email == ""){
        const user = await prismaClient.user.findMany();
        return response.json(user);
      }
    
    }  

      
}