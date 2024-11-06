import { hash } from "bcryptjs";

import { Clinic, Prisma } from "@prisma/client";
import { UsersRepository } from "@/repositories/usersRepository";
import { UserAlreadyExistsError } from "./errors/user-already-exists";
import { ClinicsRepository } from "@/repositories/clinicsRepository";

export interface RegisterClinicUseCaseRequest {
  name: string;
  email: string;
  phone: string;
  address: Prisma.AddressCreateWithoutUserInput;
  admin: RegisterUserAdmin;
}

export interface RegisterUserAdmin {
  email: string;
  password: string;
  name: string;
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
    const userAdmWithSameEmail = await this.usersRepository.findByEmail(
      admin.email
    );

    if (userWithSameEmail || userAdmWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const userAdmin = await this.usersRepository.create({
      email: admin.email,
      password: password_hash,
      profile_type: "clinicAdmin",
      name: admin.name,
    });
    console.log(userAdmin);
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
