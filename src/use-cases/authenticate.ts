import { prisma } from "@/lib/prisma";
import { UsersRepository } from "@/repositories/usersRepository";
import { compare } from "bcryptjs";

interface AuthenticateUseCaseRequest {
  email: string;
  senha: string;
}
type AuthenticateUseCaseResponse = void;

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    senha,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    //  buscar o usuário no banco pelo e-mail
    // comparar se a senha salva no banco bate com a senha do param
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new Error("Esse e-mail não está cadastrado na plataforma");
    }
    const isPasswordCorrectlyHashed = await compare(user.senha, senha);
    console.log(isPasswordCorrectlyHashed);
  }
}
