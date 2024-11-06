import { Clinic, Doctor, Prisma, User } from "@prisma/client";

export interface ClinicsRepository {
  create(
    user: User,
    clinic: Prisma.ClinicUncheckedCreateInput,
    Address: Prisma.AddressCreateWithoutUserInput
  ): Promise<any>;
}
