import { hash } from "bcryptjs";

import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "@/repositories/usersRepository";
import { UserAlreadyExistsError } from "./errors/user-already-exists";

export interface RegisterPatientUseCaseRequest {
  email: string;
  senha: string;
  perfil_id: number;
}

interface RegisterPatientUseCaseResponse {
  user: User;
}

export class RegisterPatientUseCase {
  constructor(protected usersRepository: UsersRepository) {}

  async execute({
    email,
    senha,
    perfil_id,
  }: RegisterPatientUseCaseRequest): Promise<RegisterPatientUseCaseResponse> {
    const password_hash = await hash(senha, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      email,
      senha: password_hash,
      perfil_id: perfil_id,
    });

    return { user };
  }
}
