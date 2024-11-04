import { PrismaPatientsRepository } from "@/repositories/prisma/prisma-patients-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterPatientUseCase } from "../register-patient";

export function makeRegisterPatientUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const prismaPatientsRepository = new PrismaPatientsRepository();
  const registerUseCase = new RegisterPatientUseCase(
    prismaUsersRepository,
    prismaPatientsRepository
  );

  return registerUseCase;
}
