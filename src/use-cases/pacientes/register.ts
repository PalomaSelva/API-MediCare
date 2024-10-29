import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "../errors/user-already-exists";
import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "@/repositories/usersRepository";

export interface RegisterUseCaseRequest {
  email: string;
  senha: string;
  perfil: number;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(protected usersRepository: UsersRepository) {}

  async execute({
    email,
    senha,
    perfil,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(senha, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      email,
      senha: password_hash,
      profileId: perfil,
    });

    return { user };
  }
}
