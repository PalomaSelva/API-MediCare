import { beforeAll, describe, expect, it, test } from "vitest";
import { RegisterUseCase } from "./register";
import { compare, hash } from "bcryptjs";
import { InMemoryPacientsRepository } from "@/repositories/in-memory/in-memory-pacientes-repository";
import { UserAlreadyExistsError } from "../errors/user-already-exists";

describe("Register Use Case", () => {
  it("Deve ser possível cadastrar um paciente.", async () => {
    const pacientesRepository = new InMemoryPacientsRepository();
    const registerUseCase = new RegisterUseCase(pacientesRepository);
    const { paciente } = await registerUseCase.execute({
      email: "teste@example.com",
      senha: "12345",
    });

    expect(paciente.id).toEqual(expect.any(String));
  });

  it("Deve ser possível criptografas a senha assim que o usuário se cadastrar.", async () => {
    const pacientesRepository = new InMemoryPacientsRepository();
    const registerUseCase = new RegisterUseCase(pacientesRepository);
    const { paciente } = await registerUseCase.execute({
      email: "teste@example.com",
      senha: "12345",
    });
    const isPasswordCorrectlyHashed = await compare("12345", paciente.senha);
    expect(isPasswordCorrectlyHashed).toBe(true);
    console.log(paciente.senha);
    console.log(isPasswordCorrectlyHashed);
  });

  it("Não deve ser possível cadastrar múltiplas contas com o mesmo e-mail", async () => {
    const pacientesRepository = new InMemoryPacientsRepository();
    const registerUseCase = new RegisterUseCase(pacientesRepository);
    const email = "teste@example.com";
    await registerUseCase.execute({
      email: "teste@example.com",
      senha: "12345",
    });

    expect(() => {
      return registerUseCase.execute({
        email: "teste@example.com",
        senha: "12345",
      });
    }).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
