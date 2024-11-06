import { hash } from "bcryptjs";

import { Patient, Prisma, ProfileType, User } from "@prisma/client";
import { UsersRepository } from "../repositories/usersRepository";
import { UserAlreadyExistsError } from "./errors/user-already-exists";
import { PatientsRepository } from "../repositories/patientsRepository";

export interface RegisterPatientUseCaseRequest {
  email: string;
  password: string;
}

interface RegisterPatientUseCaseResponse {
  patient: User;
}

export class RegisterPatientUseCase {
  constructor(
    protected usersRepository: UsersRepository,
    protected patientsRepository: PatientsRepository
  ) {}

  async execute({
    email,
    password,
  }: RegisterPatientUseCaseRequest): Promise<RegisterPatientUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      email,
      password: password_hash,
      profile_type: "patient",
    });

    const patient = await this.patientsRepository.create(user);

    return { patient };
  }
}
