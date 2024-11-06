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
  address: Prisma.AddressCreateWithoutUserInput;
  admin: Prisma.UserUncheckedCreateInput;
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
    address,
    admin,
  }: RegisterClinicUseCaseRequest): Promise<RegisterClinicUseCaseResponse> {
    const password_hash = await hash(admin.password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const userAdmin = await this.usersRepository.create({
      email,
      password: password_hash,
      profile_type: "clinicAdmin",
      name,
    });

    const clinicData = {
      name,
      email,
      phone,
    };

    const clinic = await this.clinicRepository.create(
      userAdmin,
      clinicData,
      address
    );

    return { clinic };
  }
}
