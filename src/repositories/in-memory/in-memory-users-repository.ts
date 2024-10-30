import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../usersRepository";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];
  async create(data: Prisma.UserUncheckedCreateInput) {
    const user = {
      id: "user-1",
      email: data.email,
      senha: data.senha,
      perfil_id: data.perfil_id,
      nome: data.nome ?? null,
      sobrenome: data.sobrenome ?? null,
      telefone: data.telefone ?? null,
      especialidade_id: data.especialidade_id ?? null,
    };
    this.items.push(user);
    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email === email);

    if (!user) return null;

    return user;
  }
}
