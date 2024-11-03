import { describe, expect, it, test } from "vitest";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

import { AuthenticateUseCase } from "./authenticate";

import { InvalidCredentialsError } from "./errors/invalid-credentials";
import { hash } from "bcryptjs";

describe("Authenticate Use Case", () => {
  it("Deve ser possível se autenticar.", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      email: "teste@example.com",
      password: await hash("12345", 6),
      profile_type: "patient",
    });

    const { user } = await sut.execute({
      email: "teste@example.com",
      password: "12345",
    });

    expect(user.id).toEqual(expect.any(Number));
  });
  it("Não deve ser possível se autenticar com um e-mail inválido.", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    expect(() =>
      sut.execute({
        email: "teste@example.com",
        password: "12345",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
