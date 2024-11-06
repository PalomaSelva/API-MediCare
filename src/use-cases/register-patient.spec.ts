import { beforeAll, beforeEach, describe, expect, it, test } from "vitest";

import { compare, hash } from "bcryptjs";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists";
import { RegisterPatientUseCase } from "./register-patient";
import { InMemoryPatientsRepository } from "../repositories/in-memory/in-memory-patients-repository";

let usersRepository: InMemoryUsersRepository;
let patientsRepository: InMemoryPatientsRepository;
let sut: RegisterPatientUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    patientsRepository = new InMemoryPatientsRepository();
    sut = new RegisterPatientUseCase(usersRepository, patientsRepository);
  });

  it("Deve ser possível cadastrar um user.", async () => {
    const { patient } = await sut.execute({
      email: "teste@example.com",
      password: "12345",
    });

    expect(patient.id).toEqual(expect.any(Number));
  });

  it("Deve ser possível criptografas a senha assim que o usuário se cadastrar.", async () => {
    const { patient } = await sut.execute({
      email: "teste@example.com",
      password: "12345",
    });
    const isPasswordCorrectlyHashed = await compare("12345", patient.password);
    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("Não deve ser possível cadastrar múltiplas contas com o mesmo e-mail", async () => {
    const { patient } = await sut.execute({
      email: "teste@example.com",
      password: "12345",
    });
    await expect(() => {
      return sut.execute({
        email: "teste@example.com",
        password: "12345",
      });
    }).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
