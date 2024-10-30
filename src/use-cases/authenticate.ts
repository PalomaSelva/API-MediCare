import { UsersRepository } from "@/repositories/usersRepository";

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
    return;
  }
}
