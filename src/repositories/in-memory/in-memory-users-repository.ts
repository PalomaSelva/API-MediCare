import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../usersRepository";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];
  async create(data: Prisma.UserUncheckedCreateInput) {
    const paciente = {
      id: "user-1",
      nome: data.nome ?? "",
      sobrenome: data.sobrenome ?? "",
      email: data.email,
      senha: data.senha,
      profileId: data.profileId,
    };
    this.items.push(paciente);
    return paciente;
  }

  async findByEmail(email: string) {
    const paciente = this.items.find((paciente) => paciente.email === email);

    if (!paciente) return null;

    return paciente;
  }
}
