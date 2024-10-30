import { prisma } from "@/lib/prisma";
import { UsersRepository } from "@/repositories/usersRepository";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials";
import { User } from "@prisma/client";

interface AuthenticateUseCaseRequest {
  email: string;
  senha: string;
}
interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    senha,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    //  buscar o usuário no banco pelo e-mail
    // comparar se a senha salva no banco bate com a senha do param
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }
    const doesPasswordMatches = await compare(user.senha, senha);
    console.log(doesPasswordMatches);

    return { user };
  }
}
