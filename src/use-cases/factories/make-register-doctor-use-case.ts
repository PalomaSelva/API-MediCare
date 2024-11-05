import { PrismaPatientsRepository } from "@/repositories/prisma/prisma-patients-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterPatientUseCase } from "../register-patient";
import { PrismaDoctorsRepository } from "@/repositories/prisma/prisma-doctors-repository";
import { RegisterDoctorUseCase } from "../register-doctor";

export function makeRegisterDoctorUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const prismaDoctorsRepository = new PrismaDoctorsRepository();
  const registerUseCase = new RegisterDoctorUseCase(
    prismaUsersRepository,
    prismaDoctorsRepository
  );

  return registerUseCase;
}
