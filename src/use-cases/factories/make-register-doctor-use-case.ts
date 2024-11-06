import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
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
