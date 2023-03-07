import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class CreateClienteController {
  async handle(request: Request, response: Response) {
    const { nome, fone, cep, endereco, numero, complemento, contatos } =
      request.body;
    try {
      /*
        const isexite = await prismaClient.clientes.count({
           where: { cpfcnpj: String(cpfcnpj) }            
        });

        if (isexite != 0){
            return response.status(400).json({ error: 'Já existe um cadastro com o mesmo CPF/CNPJ!' });
        }*/

      const cliente = await prismaClient.clientes.create({
        data: {
          nome,
          fone,
          cep,
          endereco,
          numero,
          complemento,
        },
      });
      // Criação de contatos relacionados ao cliente
      const contatoData = contatos.map((contato: any) => {
        return {
          contato: contato.nome,
          fonecel: contato.telefone,
          clienteId: cliente.id,
        };
      });
      const contatosCriados = await prismaClient.contatos.createMany({
        data: contatoData,
      });

      return response.json({ cliente, contatos: contatosCriados });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return response.status(404).json({ error: "User not found" });
      } else {
        throw error;
      }
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { nome, fone, cep, endereco, numero, complemento } = request.body;

    try {
      const cliente = await prismaClient.clientes.update({
        where: { id: Number(id) },
        data: { nome, fone, cep, endereco, numero, complemento },
      });
      return response.json(cliente);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return response.status(404).json({ error: "User not found" });
      } else {
        throw error;
      }
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const isexite = await prismaClient.clientes.count({
        where: { id: Number(id) },
      });
      if (isexite == 0) {
        return response.status(400).json({ error: "Cliente já foi excluido!" });
      }

      await prismaClient.clientes.delete({
        where: { id: Number(id) },
      });
      return response
        .status(204)
        .send({ confirm: "Cliente excluido com sucesso" });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return response.status(404).json({ error: "Cliente not found" });
      } else {
        throw error;
      }
    }
  }

  async getUserByAll(request: Request, response: Response) {
    const { id, nome, fone } = request.body;

    //pesquisa só id
    if (id != "" && nome == "" && fone == "") {
      const cliente = await prismaClient.clientes.findUnique({
        where: { id: Number(id) },
      });
      return response.json(cliente);
    }
    //pesquisa por nome
    if (id == "" && nome != "" && fone == "") {
      const cliente = await prismaClient.clientes.findMany({
        where: {
          nome: {
            contains: String(nome),
          },
        },
      });
      return response.json(cliente);
    }

    //pesquisar por nome e email
    if (id == "" && nome != "" && fone != "") {
      const cliente = await prismaClient.clientes.findMany({
        where: {
          nome: {
            contains: String(nome),
          },
          fone: String(fone),
        },
      });
      return response.json(cliente);
    }

    //pesquisar por email
    if (id == "" && nome == "" && fone != "") {
      const cliente = await prismaClient.clientes.findMany({
        where: { fone: String(fone) },
      });
      return response.json(cliente);
    }
    //busca tudo
    if (id == "" && nome == "" && fone == "") {
      const cliente = await prismaClient.clientes.findMany();
      return response.json(cliente);
    }
  }

  //contatos
  async addContatos(request: Request, response: Response) {
    const { nome, telefone, clienteid } = request.body;
    try {
      const contato = await prismaClient.contatos.create({
        data: {
          contato: nome,
          fonecel: telefone,
          clienteId: clienteid,
        },
      });

      return response.json(contato);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return response.status(404).json({ error: "User not found" });
      } else {
        throw error;
      }
    }
  }

  async delContatos(request: Request, response: Response) {
    const { id, nome } = request.body;

    try {
      const isexite = await prismaClient.contatos.count({
        where: {
          AND: [{ id: Number(id) }, { contato: String(nome) }],
        },
      });

      if (isexite == 0) {
        return response.status(400).json({ error: "Contato já foi removido!" });
      }

      await prismaClient.contatos.deleteMany({
        where: {
          AND: [{ id: Number(id) }, { contato: String(nome) }],
        },
      });
      return response
        .status(204)
        .send({ confirm: "Cliente excluido com sucesso" });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return response.status(404).json({ error: "Cliente not found" });
      } else {
        throw error;
      }
    }
  }
}
