import { Clinic, Doctor, Prisma, User } from "@prisma/client";

export interface ClinicsRepository {
  create(clinic: Prisma.ClinicUncheckedCreateInput): Promise<Clinic>;
}
