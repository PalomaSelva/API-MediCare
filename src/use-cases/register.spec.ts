import { beforeAll, describe, expect, it, test } from "vitest";
import { RegisterUseCase } from "./register";
import { compare, hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists";

describe("Register Use Case", () => {
  it("Deve ser possível cadastrar um user.", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);
    const { user } = await registerUseCase.execute({
      email: "teste@example.com",
      senha: "12345",
      perfil_id: 1,
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("Deve ser possível criptografas a senha assim que o usuário se cadastrar.", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);
    const { user } = await registerUseCase.execute({
      email: "teste@example.com",
      senha: "12345",
      perfil_id: 1,
    });
    const isPasswordCorrectlyHashed = await compare("12345", user.senha);
    expect(isPasswordCorrectlyHashed).toBe(true);
    console.log(user.senha);
    console.log(isPasswordCorrectlyHashed);
  });

  it("Não deve ser possível cadastrar múltiplas contas com o mesmo e-mail", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    await registerUseCase.execute({
      email: "teste@example.com",
      senha: "12345",
      perfil_id: 1,
    });

    await expect(() => {
      return registerUseCase.execute({
        email: "teste@example.com",
        senha: "12345",
        perfil_id: 1,
      });
    }).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
