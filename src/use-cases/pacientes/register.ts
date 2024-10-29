import { PacientesRepository } from "@/repositories/pacientesRepository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "../errors/user-already-exists";
import { Prisma, Paciente } from "@prisma/client";

export interface RegisterUseCaseRequest {
  email: string;
  senha: string;
}

interface RegisterUseCaseResponse {
  paciente: Paciente;
}

export class RegisterUseCase {
  constructor(protected pacientesRepository: PacientesRepository) {}

  async execute({
    email,
    senha,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(senha, 6);

    const userWithSameEmail = await this.pacientesRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const paciente = await this.pacientesRepository.create({
      email,
      senha: password_hash,
    });

    return { paciente };
  }
}
