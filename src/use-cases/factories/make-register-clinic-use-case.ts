import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

import { RegisterDoctorUseCase } from "../register-doctor";
import { PrismaClinicsRepository } from "@/repositories/prisma/prisma-clinics-repository";
import { RegisterClinicUseCase } from "../register-clinic";

export function makeRegisterClinicUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const prismaClinicsRepository = new PrismaClinicsRepository();
  const registerUseCase = new RegisterClinicUseCase(
    prismaUsersRepository,
    prismaClinicsRepository
  );

  return registerUseCase;
}
