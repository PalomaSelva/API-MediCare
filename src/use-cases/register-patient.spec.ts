import { beforeAll, describe, expect, it, test } from "vitest";

import { compare, hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists";
import { RegisterPatientUseCase } from "./register-patient";
import { InMemoryPatientsRepository } from "@/repositories/in-memory/in-memory-patients-repository";

describe("Register Use Case", () => {
  it("Deve ser possível cadastrar um user.", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const patientsRepository = new InMemoryPatientsRepository();
    const registerUseCase = new RegisterPatientUseCase(
      usersRepository,
      patientsRepository
    );
    const { patient } = await registerUseCase.execute({
      email: "teste@example.com",
      password: "12345",
    });

    expect(patient.id).toEqual(expect.any(Number));
  });

  it("Deve ser possível criptografas a senha assim que o usuário se cadastrar.", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const patientsRepository = new InMemoryPatientsRepository();
    const registerUseCase = new RegisterPatientUseCase(
      usersRepository,
      patientsRepository
    );
    const { patient } = await registerUseCase.execute({
      email: "teste@example.com",
      password: "12345",
    });

    

    const isPasswordCorrectlyHashed = await compare("12345", patient.);
    expect(isPasswordCorrectlyHashed).toBe(true);
    console.log(patient.);
    console.log(isPasswordCorrectlyHashed);
  });

  it("Não deve ser possível cadastrar múltiplas contas com o mesmo e-mail", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterPatientUseCase(usersRepository);

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
