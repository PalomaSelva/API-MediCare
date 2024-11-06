import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

import {
  Address,
  Clinic,
  Doctor,
  Prisma,
  ProfileType,
  User,
} from "@prisma/client";
import { UsersRepository } from "@/repositories/usersRepository";
import { UserAlreadyExistsError } from "./errors/user-already-exists";
import { DoctorsRepository } from "@/repositories/doctorsRepository";
import { RegisterDoctorUseCaseRequest } from "./register-doctor";
import { ClinicsRepository } from "@/repositories/clinicsRepository";

export interface RegisterClinicUseCaseRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  address: Prisma.AddressUncheckedCreateNestedOneWithoutClinicInput;
  admin: Prisma.UserUncheckedCreateNestedManyWithoutClinicInput;
}

interface RegisterClinicUseCaseResponse {
  clinic: Clinic;
}

export class RegisterClinicUseCase {
  constructor(
    protected usersRepository: UsersRepository,
    protected clinicRepository: ClinicsRepository
  ) {}

  async execute({
    name,
    email,
    phone,
    password,
    address,
    admin,
  }: RegisterClinicUseCaseRequest): Promise<RegisterClinicUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const clinic = await this.clinicRepository.create({
      email,
      name,
      phone,
      Address: address,
      User: admin,
    });

    return { clinic };
  }
}
