import { Paciente, Prisma } from "@prisma/client";

export interface PacientesRepository {
  create(data: Prisma.PacienteCreateInput): Promise<Paciente>;
  findByEmail(email: string): Promise<Paciente | null>;
}
