import { PacientesRepository } from "@/repositories/pacientesRepository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "../errors/user-already-exists";

export interface RegisterUseCaseRequest {
  email: string;
  senha: string;
}

export class RegisterUseCase {
  constructor(protected pacientesRepository: PacientesRepository) {}

  async execute({ email, senha }: RegisterUseCaseRequest) {
    const password_hash = await hash(senha, 6);

    const userWithSameEmail = await this.pacientesRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    await this.pacientesRepository.create({ email, senha: password_hash });
  }
}
