import { hash } from "bcryptjs";

import { Address, Doctor, Prisma, ProfileType, User } from "@prisma/client";
import { UsersRepository } from "../repositories/usersRepository";
import { UserAlreadyExistsError } from "./errors/user-already-exists";
import { DoctorsRepository } from "../repositories/doctorsRepository";

export interface RegisterDoctorUseCaseRequest {
  name: string;
  email: string;
  password: string;
  specialty: number;
  address: Prisma.AddressCreateWithoutUserInput;
}

interface RegisterDoctorUseCaseResponse {
  doctor: Doctor;
}

export class RegisterDoctorUseCase {
  constructor(
    protected usersRepository: UsersRepository,
    protected doctorsRepository: DoctorsRepository
  ) {}

  async execute({
    name,
    email,
    password,
    address,
    specialty,
  }: RegisterDoctorUseCaseRequest): Promise<RegisterDoctorUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      email,
      password: password_hash,
      profile_type: "doctor",
      name,
    });

    const doctor = await this.doctorsRepository.create(user, {
      address,
      specialty: specialty,
    });

    return { doctor };
  }
}
