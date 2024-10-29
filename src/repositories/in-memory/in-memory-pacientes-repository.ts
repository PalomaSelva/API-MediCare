import { prisma } from "@/lib/prisma";
import { Paciente, Prisma } from "@prisma/client";
import { PacientesRepository } from "../pacientesRepository";

export class InMemoryPacientsRepository implements PacientesRepository {
  public items: Paciente[] = [];
  async create(data: Prisma.PacienteCreateInput) {
    const paciente = {
      id: "user-1",
      nome: data.nome ?? "",
      sobrenome: data.sobrenome ?? "",
      email: data.email,
      senha: data.senha,
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
