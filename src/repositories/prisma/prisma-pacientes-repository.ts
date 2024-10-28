import { Prisma, Paciente } from "@prisma/client";
import { PacientesRepository } from "../pacientesRepository";
import { prisma } from "@/lib/prisma";

export class PrismaPacientesRepository implements PacientesRepository {
  async create(data: Prisma.PacienteCreateInput) {
    const user = prisma.paciente.create({
      data: {
        email: data.email,
        senha: data.senha,
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = prisma.paciente.findUnique({
      where: { email },
    });
    return user;
  }
}
